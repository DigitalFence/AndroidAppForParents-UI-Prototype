# UI Design Standards & Design System - Digital Fence Parent App

**Last Updated:** 2026-01-09
**Purpose:** The Single Source of Truth for all UI/UX decisions, styles, and patterns in the application.

---

## 1. 🎨 Design Principles

### **Reduce Cognitive Load**
- **Clear Visual Hierarchy**: Use size, weight, and color to establish importance.
- **Consistent Patterns**: Reuse familiar UI patterns across screens.
- **Progressive Disclosure**: Show essential information first, details on demand.

### **Soft Security Aesthetic**
- **Calming Colors**: Safe blues and sage greens instead of harsh reds.
- **Rounder is Better**: Softer, approachable 16-24px rounded corners.
- **Glassmorphism**: Subtle frosted glass effects for depth.

---

## 2. 🎨 Color System

### **Primary Brand Colors**
```css
--color-primary: #667eea;       /* Trust Blue */
--color-primary-dark: #764ba2;  /* Royal Purple */
/* Used in Gradients: linear-gradient(135deg, #667eea, #764ba2) */
```

### **Semantic Status Colors**
```css
/* Positive / Safe / Active */
--color-sage: #6BCF7E;          /* Primary Success */
--color-sage-light: rgba(16, 185, 129, 0.15);
--color-text-success: #059669;

/* Warning / Limits */
--color-warning: #F59E0B;
--color-warning-light: rgba(245, 158, 11, 0.15);

/* Error / Blocked / Destructive */
--color-error: #EF4444;
--color-error-light: rgba(239, 68, 68, 0.1);
--color-text-error: #DC2626;

/* Info / Neutral */
--color-info: #3B82F6;
--color-info-light: rgba(59, 130, 246, 0.1);
```

### **Background & Surface**
```css
--color-bg-light: #F6F6F8;
--color-surface: #FFFFFF;
--color-surface-glass: rgba(255, 255, 255, 0.8); /* with backdrop-filter: blur(20px) */

/* Dark Mode */
--color-bg-dark: #101622;
--color-surface-dark: #1E2536;
```

---

## 3. 📐 Spacing & Whitespace Standards

### **The 4px/8px Grid System**
All spacing must be divisible by 4.

```css
--space-1: 4px;
--space-2: 8px;   /* xs - Tight grouping */
--space-3: 12px;  /* sm - Related items */
--space-4: 16px;  /* md - Default padding */
--space-5: 20px;  /* lg - Section separation */
--space-6: 24px;  /* xl - Major gaps / Top spacing */
--space-8: 32px;  /* 2xl - Major sections */
--space-12: 48px; /* 3xl - Landing page sections */
```

### **Applied Whitespace Strategies**

#### **Mobile-First Onboarding (Sign-Up, Family Setup)**
- **Top Spacer**: **24px** (Optimal breathing room above app icon).
- **Icon Margins**: **20px** bottom margin.
- **Section Gaps**: **20px** between titles and forms.
- **Constraint**: Primary content (Logo + Title + Main CTA) **must** be visible above the fold on 375px height screens.

#### **Content Cards (Dashboards)**
- **Card Padding**: **20px-24px** (Standard) or **16px** (Compact).
- **Internal Gaps**: **12px** between icon and text.

---

## 4. 🔤 Typography

**Font Family**: `'Plus Jakarta Sans', sans-serif`

### **Scale**
| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| **Display** | 24-28px | 800 (ExtraBold) | Hero Titles, Child Names |
| **H1 (Page)** | 20-22px | 700 (Bold) | Screen Titles |
| **H2 (Section)** | 16-18px | 700 (Bold) | Card Headers |
| **Body (Default)**| 14px | 500 (Medium) | Standard Text |
| **Body (Small)** | 12-13px | 600 (SemiBold) | Secondary info |
| **Caption/Label**| 10-11px | 700 (Bold) | Badges, Uppercase labels |

---

## 5. 🔘 Borders & Shapes

### **Corner Radius Scale**
```css
--radius-sm: 8px;   /* Small buttons, tags */
--radius-md: 12px;  /* Standard inputs, icon boxes */
--radius-lg: 16px;  /* Standard Cards, Action Sheets */
--radius-xl: 24px;  /* Hero Cards, Modals */
--radius-round: 50%; /* Avatars, Fab buttons */
```

### **Special Shapes**
- **App Icon**: Squircle (18px radius on 80px size).
- **Family Card Avatar**: Squircle (16px radius).

---

## 6. 🌑 Shadows & Elevation

We use "Soft Shadows" to create depth without harsh lines.

```css
/* Tactile / Interactive */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);

/* Floating / Cards */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);

/* Elevation / Modals */
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);

/* Brand Glow (Primary Color) */
--shadow-glow: 0 8px 24px rgba(102, 126, 234, 0.3);
```

---

## 7. 🧩 Components & Patterns

### **Buttons**
- **Primary**: Gradient background (`--color-primary` to `--color-primary-dark`). White Text. Shadow Glow.
- **Secondary**: Surface background. Primary Text. No border (or subtle).
- **Height**: Minimum **48px** for touch targets.

### **Cards (Glassmorphism)**
- **Background**: Linear Gradient (White 0.9 -> White 0.7).
- **Backdrop Filter**: `blur(20px)`.
- **Border**: `1px solid rgba(0,0,0,0.05)`.
- **Hover**: TranslateY(-2px), Shadow Increase.

### **Status Badges**
- **Shape**: Pill (Full radius).
- **Active/Safe**: Green Tint BG + Green Text + Pulsing Dot.
- **Idle/Offline**: Grey Tint BG + Grey Text.

### **Progress Indicators (Onboarding)**
- **Style**: Segmented Bars (not dots).
- **Count**: 4 Bars total.
- **Behavior**: Progressive filling (Fill 1, then 1+2, then 1+2+3...).

### **Navigation Tabs**
- **Style**: Segmented Pill.
- **Active**: White/Surface shadow.
- **Inactive**: Transparent.

---

## 8. 🖼️ Icons & Imagery

### **App Icon**
- **Size**: 80x80px (Sign Up), 40x40px (Headers).
- **Style**: Shield emblem.

### **System Icons**
- **Library**: Material Symbols Outlined.
- **Size**: 20px (Small), 24px (Standard), 28px (Hero).
- **Color**: Usually `--color-text-tertiary` (inactive) or `--color-primary` (active).

---

## 9. ⚡ Animations

- **Duration**: `0.2s` (Interaction), `0.3s` (Transition).
- **Easing**: `ease-out`.
- **Hover Effects**: Lift (`translateY(-2px)`) + Opacity/Shadow change.
- **Pulsing**: Used for "Active Now" status or "Help" action.

---

## 10. ✅ Accessibility Checklist

| Element | Standard |
|---------|----------|
| **Touch Targets** | Min 44x44px. |
| **Contrast** | Text > 4.5:1 ratio against background. |
| **Forms** | `required` attributes, explicit labels, no placeholders as labels. |
| **Focus** | Visible outline on keyboard focus. |
| **Images** | Descriptive `alt` text. |

---

## 11. 📱 Responsive Standards

- **Mobile First**: Design for 320px width minimum.
- **Max Width**: Content container capped at **448px** (Tablet/Desktop view centers this container).

---

**Use this document as the absolute reference for any UI implementation.**
