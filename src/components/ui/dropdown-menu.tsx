'use client'

import React, { useState, createContext, useContext, useCallback, useRef, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

// Lazy load EqualAIPortrait with delay
const EqualAIPortrait = React.lazy(() => 
  import('./equal-ai-portrait').then(module => ({ default: module.EqualAIPortrait }))
)

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
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    // Detect if this is a touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const setAnimationDirection = useCallback((tab: number | null) => {
    if (typeof currentTab === 'number' && typeof tab === 'number') {
      setDirection(currentTab > tab ? 'rtl' : 'ltr')
    } else if (tab === null) {
      setDirection(null)
    }

    setCurrentTab(tab)
  }, [currentTab])

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

  const handleMouseLeave = useCallback(() => {
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
  }, [isTouchDevice, setAnimationDirection])

  const handleMouseEnter = useCallback(() => {
    // Clear the close timeout if user re-enters
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  const contextValue = useMemo(() => ({ direction, setAnimationDirection }), [direction, setAnimationDirection])
  const currentTabValue = useMemo(() => ({ currentTab }), [currentTab])

  return (
    <DirectionContext.Provider value={contextValue}>
      <CurrentTabContext.Provider value={currentTabValue}>
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

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
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
  }, [setAnimationDirection])

  const handleClick = useCallback((index: number) => {
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
  }, [isTouchDevice, currentTab, setAnimationDirection])

  const handleMouseEnter = useCallback((index: number) => {
    // Only use mouse enter on non-touch devices
    if (!isTouchDevice) {
      setAnimationDirection(index + 1)
    }
  }, [isTouchDevice, setAnimationDirection])

  return (
    <div className="flex flex-row gap-2 md:gap-4">
      {React.Children.map(children, (e, i) => (
        <button
          key={i}
          onMouseEnter={() => handleMouseEnter(i)}
          onClick={() => handleClick(i)}
          onKeyDown={(event) => handleKeyDown(event, i)}
          aria-expanded={currentTab === i + 1}
          aria-controls={`dropdown-content-${i}`}
          role="menuitem"
          className={`flex h-10 md:h-12 items-center gap-1 rounded-lg px-3 md:px-4 py-1 text-base font-bold tracking-widest transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00b140] focus:ring-offset-2 min-h-[44px] min-w-[44px] ${
            currentTab === i + 1 
              ? 'bg-white/70 backdrop-blur-xl text-[#00b140] border border-slate-200 [&>svg]:rotate-180 hover:shadow-lg' 
              : 'text-slate-800'
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
  const [showEqualAI, setShowEqualAI] = React.useState(false)
  const positioningTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  // Company section detection
  const getCompanySection = (pathname: string): 'equal' | 'moneyone' | 'onemoney' | 'default' => {
    const host = typeof window !== 'undefined' ? window.location.host : '';
    if (pathname.startsWith('/equal') || pathname.startsWith('/solutions')) {
      return 'equal';
    }
    if (pathname.startsWith('/moneyone') || host.includes("moneyone.in")) {
      return 'moneyone';
    }
    if (pathname.startsWith('/onemoney') || host.includes("onemoney.in")) {
      return 'onemoney';
    }
    return 'default';
  };

  const currentSection = getCompanySection(pathname);

  // Find the index of the ProductDropdownContent tab
  const childrenArray = React.Children.toArray(children);
  const productTabIndex = childrenArray.findIndex(child => {
    if (React.isValidElement(child)) {
      const element = child as React.ReactElement;
      if (element.props && (element.props as any).children) {
        const inner = (element.props as any).children;
        if (React.isValidElement(inner) && typeof inner.type !== 'string' && 'displayName' in inner.type) {
          // @ts-ignore
          return inner.type.displayName === 'ProductDropdownContent';
        }
      }
    }
    return false;
  });

  // Throttled positioning calculation using RAF
  const calculatePositioning = useCallback(() => {
    if (positioningTimeoutRef.current) {
      clearTimeout(positioningTimeoutRef.current)
    }
    
    positioningTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        const container = document.querySelector('[data-dropdown-container]')
        const triggerWrapper = container?.querySelector('div') as HTMLElement
        const activeButton = triggerWrapper?.children[currentTab! - 1] as HTMLElement
        const dropdown = document.querySelector('#dropdown-content') as HTMLElement
        
        if (activeButton && dropdown && triggerWrapper) {
          const dropdownContent = dropdown.querySelector('.rounded-lg') as HTMLElement
          const dropdownContentRect = dropdownContent?.getBoundingClientRect()
          const triggerWrapperRect = triggerWrapper.getBoundingClientRect()
          const buttonRect = activeButton.getBoundingClientRect()
          
          if (dropdownContentRect) {
            const buttonCenter = buttonRect.left + buttonRect.width / 2
            const triggerWrapperCenter = triggerWrapperRect.left + triggerWrapperRect.width / 2
            const dropdownContentWidth = dropdownContentRect.width
            const relativePosition = (buttonCenter - triggerWrapperCenter) + (dropdownContentWidth / 2)
            
            setArrowPosition(relativePosition)
            setDropdownWidth(dropdownContentWidth)
          }
        }
      })
    }, 16) // ~60fps throttling
  }, [currentTab])

  React.useEffect(() => {
    if (currentTab !== null) {
      // Reset content height when tab changes to ensure fresh calculation
      setContentHeight('auto')
      calculatePositioning()
    }
    
    return () => {
      if (positioningTimeoutRef.current) {
        clearTimeout(positioningTimeoutRef.current)
      }
    }
  }, [currentTab, calculatePositioning])

  // Delay EqualAI portrait loading
  React.useEffect(() => {
    let timeout: NodeJS.Timeout
    if (currentTab === productTabIndex + 1) {
      // Show EqualAI after 400ms delay to let main dropdown load first
      timeout = setTimeout(() => {
        setShowEqualAI(true)
      }, 400)
    } else {
      setShowEqualAI(false)
    }
    
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [currentTab, productTabIndex])
  
  // Optimized animation variants
  const dropdownVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      scale: 0.96,
      y: -10
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: dropdownWidth ? -dropdownWidth / 2 : 0
    }
  }), [dropdownWidth])

  const contentVariants = useMemo(() => ({
    hidden: { 
      opacity: 0,
      x: direction === 'ltr' ? 30 : direction === 'rtl' ? -30 : 0
    },
    visible: { 
      opacity: 1, 
      x: 0
    }
  }), [direction])
  
  return (
    <>
      <motion.div
        id="dropdown-content"
        variants={dropdownVariants}
        initial="hidden"
        animate={currentTab ? "visible" : "hidden"}
        transition={{
          duration: 0.25,
          ease: [0.25, 0.46, 0.45, 0.94], // easeOutCubic
          x: {
            duration: 0.2,
            ease: "easeInOut"
          }
        }}
        className="absolute left-1/2 top-[calc(100%_+_12px)] w-auto z-[9999] max-w-[95vw] lg:max-w-none"
        style={{ transform: 'translate3d(0,0,0)' }} // Force GPU acceleration
      >
        <div className="absolute -top-[12px] left-0 right-0 h-[12px]" />
        
        {/* Container for dropdown and portrait */}
        <div className="flex items-start gap-2">
          {/* Main Dropdown Content */}
          <div className="relative">
            {/* Animated Arrow Pointer - Hidden on mobile */}
            <motion.div
              className="absolute -top-[4px] w-2 h-2 border-l border-t border-neutral-200 bg-gradient-to-br from-slate-50 to-slate-100 transform rotate-45 z-10 hidden lg:block"
              animate={{ 
                left: arrowPosition - 6,
                opacity: currentTab ? 1 : 0 
              }}
              transition={{ 
                duration: 0.2,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className={cn(
                'rounded-lg border border-neutral-200 bg-gradient-to-br from-white/60 backdrop-blur-xl to-white/90 shadow-2xl overflow-hidden',
                className
              )}
              animate={{ height: contentHeight }}
              transition={{ 
                duration: 0.25,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              style={{ transform: 'translate3d(0,0,0)' }}
            >
              {React.Children.map(children, (e, i) => (
                <div key={i}>
                  <AnimatePresence mode="wait">
                    {currentTab !== null && currentTab === i + 1 && (
                      <motion.div 
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <motion.div
                          id={`dropdown-content-${i}`}
                          role="menu"
                          aria-label={`Dropdown content ${i + 1}`}
                          variants={contentVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ 
                            duration: 0.2,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }}
                          ref={(node) => {
                            if (node) {
                              // Wait for images to load and content to stabilize
                              const measureHeight = () => {
                                const rect = node.getBoundingClientRect()
                                const newHeight = Math.ceil(rect.height)
                                if (newHeight > 0 && newHeight !== contentHeight) {
                                  setContentHeight(newHeight)
                                }
                              }

                              // Check if images are loaded
                              const images = node.querySelectorAll('img')
                              if (images.length === 0) {
                                // No images, measure immediately
                                requestAnimationFrame(() => {
                                  requestAnimationFrame(measureHeight)
                                })
                              } else {
                                // Wait for images to load
                                let loadedImages = 0
                                const totalImages = images.length

                                const checkImageLoad = () => {
                                  loadedImages++
                                  if (loadedImages === totalImages) {
                                    requestAnimationFrame(() => {
                                      requestAnimationFrame(measureHeight)
                                    })
                                  }
                                }

                                images.forEach(img => {
                                  if (img.complete) {
                                    checkImageLoad()
                                  } else {
                                    img.addEventListener('load', checkImageLoad, { once: true })
                                    img.addEventListener('error', checkImageLoad, { once: true })
                                  }
                                })

                                // Fallback timeout in case images take too long
                                setTimeout(measureHeight, 200)
                              }
                            }
                          }}
                          style={{ transform: 'translate3d(0,0,0)' }} // Force GPU acceleration
                        >
                          {e}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Equal AI Portrait - Lazy loaded with delay */}
          {currentTab === productTabIndex + 1 && showEqualAI && currentSection !== 'moneyone' && (
            <div className="hidden lg:block">
              <React.Suspense fallback={
                <div className="w-[280px] h-[350px] animate-pulse bg-white/10 rounded-xl border border-[#baff29]/20" />
              }>
                <EqualAIPortrait 
                  isVisible={true} 
                  height={typeof contentHeight === 'number' ? contentHeight : 'auto'}
                />
              </React.Suspense>
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