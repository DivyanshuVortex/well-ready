#!/bin/bash

# Test script to verify all templates
echo "=== Testing Well-Ready Templates ==="
echo ""

TEMPLATES=(
  "Express-TS"
  "MERN-TS"
  "MERN-Tailwind-TS"
  "Mern-basic"
  "Next-App-Router"
  "React-Vite-Tailwind"
  "Vite-React-TS"
  "nextapp"
)

TEMPLATE_DIR="/mnt/c/Users/Divya/Desktop/well-ready/templates"
TEST_DIR="/tmp/template-tests"

# Clean up test directory
rm -rf "$TEST_DIR"
mkdir -p "$TEST_DIR"

for template in "${TEMPLATES[@]}"; do
  echo "----------------------------------------"
  echo "Testing: $template"
  echo "----------------------------------------"
  
  # Check if template exists
  if [ ! -d "$TEMPLATE_DIR/$template" ]; then
    echo "❌ FAIL: Template directory not found"
    continue
  fi
  
  echo "✅ Template directory exists"
  
  # Check for package.json
  if [ -f "$TEMPLATE_DIR/$template/package.json" ]; then
    echo "✅ Has package.json at root"
  elif [ -f "$TEMPLATE_DIR/$template/client/package.json" ]; then
    echo "✅ Has package.json in client/"
  elif [ -f "$TEMPLATE_DIR/$template/server/package.json" ]; then
    echo "✅ Has package.json in server/"
  else
    echo "⚠️  No package.json found"
  fi
  
  # List structure
  echo "📁 Structure:"
  ls -la "$TEMPLATE_DIR/$template" | head -10
  
  echo ""
done

echo "========================================="
echo "Test Summary Complete"
echo "========================================="
