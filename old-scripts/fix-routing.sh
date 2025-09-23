#!/bin/bash

# Script to fix CloudFront routing issues for directory-based URLs
# This script creates proper index.html files for directory requests

set -e

BUILD_DIR="out"

echo "🔧 Fixing routing for directory-based URLs..."

# Create index.html files for each directory that should be accessible
# This ensures that /onemoney serves /onemoney/index.html

# Copy onemoney/index.html to onemoney.html (as a fallback)
if [ -f "$BUILD_DIR/onemoney/index.html" ]; then
    echo "📁 Creating fallback for /onemoney route..."
    cp "$BUILD_DIR/onemoney/index.html" "$BUILD_DIR/onemoney.html"
fi

# Copy equal/index.html to equal.html (as a fallback)
if [ -f "$BUILD_DIR/equal/index.html" ]; then
    echo "📁 Creating fallback for /equal route..."
    cp "$BUILD_DIR/equal/index.html" "$BUILD_DIR/equal.html"
fi

# Copy moneyone/index.html to moneyone.html (as a fallback)
if [ -f "$BUILD_DIR/moneyone/index.html" ]; then
    echo "📁 Creating fallback for /moneyone route..."
    cp "$BUILD_DIR/moneyone/index.html" "$BUILD_DIR/moneyone.html"
fi


echo "✅ Routing fixes applied!"
