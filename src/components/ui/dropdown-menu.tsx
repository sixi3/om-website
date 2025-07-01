'use client'

import React, { useState, createContext, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EqualAIPortrait } from './equal-ai-portrait'

const DirectionContext = createContext<{
  direction: 'rtl' | 'ltr' | null
  setAnimationDirection: (tab: number | null) => void
} | null>(null)

const CurrentTabContext = createContext<{
  currentTab: number | null
} | null>(null)

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<null | number>(null)
  const [direction, setDirection] = useState<'rtl' | 'ltr' | null>(null)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    // Detect if this is a touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const setAnimationDirection = (tab: number | null) => {
    if (typeof currentTab === 'number' && typeof tab === 'number') {
      setDirection(currentTab > tab ? 'rtl' : 'ltr')
    } else if (tab === null) {
      setDirection(null)
    }

    setCurrentTab(tab)
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-dropdown-container]')) {
        setAnimationDirection(null)
      }
    }

    if (currentTab !== null) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('touchstart', handleClickOutside)
        // Clean up close timeout
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current)
        }
      }
    }
  }, [currentTab, setAnimationDirection])

  const handleMouseLeave = () => {
    // Only close on mouse leave for non-touch devices
    if (!isTouchDevice) {
      // Clear any existing timeout
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
      // Set a delay before closing
      closeTimeoutRef.current = setTimeout(() => {
        setAnimationDirection(null)
      }, 300) // 300ms delay
    }
  }

  const handleMouseEnter = () => {
    // Clear the close timeout if user re-enters
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  return (
    <DirectionContext.Provider value={{ direction, setAnimationDirection }}>
      <CurrentTabContext.Provider value={{ currentTab }}>
        <span
          data-dropdown-container
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          role="menu"
          className={'relative flex h-fit gap-2'}>
          {children}
        </span>
      </CurrentTabContext.Provider>
    </DirectionContext.Provider>
  )
}

export const TriggerWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTab } = useContext(CurrentTabContext)!
  const { setAnimationDirection } = useContext(DirectionContext)!
  const [isTouchDevice, setIsTouchDevice] = React.useState(false)

  React.useEffect(() => {
    // Detect if this is a touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setAnimationDirection(index + 1)
    } else if (e.key === 'Escape') {
      setAnimationDirection(null)
    } else if (e.key === 'ArrowLeft' && index > 0) {
      const prevButton = e.currentTarget.previousElementSibling as HTMLButtonElement
      prevButton?.focus()
    } else if (e.key === 'ArrowRight') {
      const nextButton = e.currentTarget.nextElementSibling as HTMLButtonElement
      nextButton?.focus()
    }
  }

  const handleClick = (index: number) => {
    if (isTouchDevice) {
      // On touch devices, toggle the dropdown
      if (currentTab === index + 1) {
        setAnimationDirection(null)
      } else {
        setAnimationDirection(index + 1)
      }
    } else {
      // On non-touch devices, just open
      setAnimationDirection(index + 1)
    }
  }

  const handleMouseEnter = (index: number) => {
    // Only use mouse enter on non-touch devices
    if (!isTouchDevice) {
      setAnimationDirection(index + 1)
    }
  }

  return (
    <div className="flex flex-row gap-2 md:gap-4">
      {React.Children.map(children, (e, i) => (
        <button
          onMouseEnter={() => handleMouseEnter(i)}
          onClick={() => handleClick(i)}
          onKeyDown={(event) => handleKeyDown(event, i)}
          aria-expanded={currentTab === i + 1}
          aria-controls={`dropdown-content-${i}`}
          role="menuitem"
          className={`flex h-10 md:h-12 items-center gap-0.5 rounded-md px-3 md:px-4 py-2 text-base md:text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00b140] focus:ring-offset-2 min-h-[44px] min-w-[44px] ${
            currentTab === i + 1 
              ? 'bg-white/90 backdrop-blur-md text-slate-700 [&>svg]:rotate-180' 
              : 'text-slate-700 hover:bg-white/80 backdrop-blur-md'
          }`}>
          {e}
        </button>
      ))}
    </div>
  )
}

export const Trigger: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return (
    <>
      <span className={cn('', className)}>{children}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative top-[1px] ml-1 h-4 w-4 transition-transform duration-300"
        aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </>
  )
}

export const TabsContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  const { currentTab } = useContext(CurrentTabContext)!
  const { direction } = useContext(DirectionContext)!
  const [contentHeight, setContentHeight] = React.useState<number | 'auto'>('auto')
  const [arrowPosition, setArrowPosition] = React.useState<number>(0)
  const [dropdownWidth, setDropdownWidth] = React.useState<number>(0)
  
  React.useEffect(() => {
    if (currentTab !== null) {
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        const container = document.querySelector('[data-dropdown-container]')
        const triggerWrapper = container?.querySelector('div') as HTMLElement // The TriggerWrapper div
        const activeButton = triggerWrapper?.children[currentTab - 1] as HTMLElement
        const dropdown = document.querySelector('#dropdown-content') as HTMLElement
        
        if (activeButton && dropdown && triggerWrapper) {
          // Get the dropdown content width (not the animated container)
          const dropdownContent = dropdown.querySelector('.rounded-lg') as HTMLElement
          const dropdownContentRect = dropdownContent?.getBoundingClientRect()
          const triggerWrapperRect = triggerWrapper.getBoundingClientRect()
          const buttonRect = activeButton.getBoundingClientRect()
          
          if (dropdownContentRect) {
            // Calculate button center relative to trigger wrapper center
            const buttonCenter = buttonRect.left + buttonRect.width / 2
            const triggerWrapperCenter = triggerWrapperRect.left + triggerWrapperRect.width / 2
            
            // Calculate arrow position relative to dropdown content center
            const dropdownContentWidth = dropdownContentRect.width
            const relativePosition = (buttonCenter - triggerWrapperCenter) + (dropdownContentWidth / 2)
            
            setArrowPosition(relativePosition)
            setDropdownWidth(dropdownContentWidth)
          }
        }
      })
    }
  }, [currentTab, contentHeight])
  
  return (
    <>
      <motion.div
        id="dropdown-content"
        initial={{
          opacity: 0,
          scale: 0.98
        }}
        animate={
          currentTab
            ? {
                opacity: 1,
                scale: 1,
                x: dropdownWidth ? -dropdownWidth / 2 : 0
              }
            : { 
                opacity: 0, 
                scale: 0.98,
                x: dropdownWidth ? -dropdownWidth / 2 : 0
              }
        }
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
          x: {
            duration: 0.25,
            ease: "easeInOut"
          }
        }}
        className="absolute left-1/2 top-[calc(100%_+_6px)] w-auto z-50 max-w-[95vw] lg:max-w-none">
        <div className="absolute -top-[6px] left-0 right-0 h-[6px]" />
        
        {/* Container for dropdown and portrait */}
        <div className="flex items-start gap-2">
          {/* Main Dropdown Content */}
          <div className="relative">
            {/* Animated Arrow Pointer */}
            <motion.div
              className="absolute -top-[4px] w-2 h-2 border-l border-t border-neutral-200 bg-gradient-to-br from-slate-50 to-slate-100 transform rotate-45 z-10"
              animate={{ 
                left: arrowPosition - 6, // Center the 12px arrow (6px offset)
                opacity: currentTab ? 1 : 0 
              }}
              transition={{ 
                duration: 0.25,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className={cn(
                'rounded-lg border border-neutral-200 bg-gradient-to-br from-white/40 backdrop-blur-md to-white/80 shadow-2xl overflow-hidden',
                className
              )}
              animate={{ height: contentHeight }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1]
              }}
            >
              {React.Children.map(children, (e, i) => (
                <div key={i}>
                  <AnimatePresence mode="wait">
                    {currentTab !== null && (
                      <motion.div 
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {currentTab === i + 1 && (
                          <motion.div
                            id={`dropdown-content-${i}`}
                            role="menu"
                            aria-label={`Dropdown content ${i + 1}`}
                            initial={{
                              opacity: 0,
                              x: direction === 'ltr' ? 100 : direction === 'rtl' ? -100 : 0
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.25,
                              ease: "easeInOut"
                            }}
                            ref={(node) => {
                              if (node) {
                                // Use requestAnimationFrame to ensure accurate measurement after layout
                                requestAnimationFrame(() => {
                                  const rect = node.getBoundingClientRect()
                                  const newHeight = Math.ceil(rect.height)
                                  if (newHeight > 0 && newHeight !== contentHeight) {
                                    setContentHeight(newHeight)
                                  }
                                })
                              }
                            }}
                          >
                            {e}
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Equal AI Portrait - Only show for Products tab (tab 1) */}
          {currentTab === 1 && (
            <div className="hidden lg:block">
              <EqualAIPortrait 
                isVisible={currentTab === 1} 
                height={typeof contentHeight === 'number' ? contentHeight : 'auto'}
              />
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

export const Tab: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  return <div className={cn('w-[650px] max-w-[90vw] p-2', className)}>{children}</div>
} 