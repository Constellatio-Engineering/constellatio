# Constellatio Web App

Welcome to the codebase for the **Constellatio Web App**! This repository contains all the components and resources powering the application.

---

## Mantine to ShadCN Migration

We are in the process of migrating this project from Mantine components to **ShadCN components**. While we have strived to keep the design language as consistent as possible, some names and conventions have changed. Below is a guide to help you map Mantine color and variant names to their Tailwind/ShadCN counterparts.

### Key Notes:
- **Default Tailwind Colors:** Tailwind colors have a default setting. For instance, `secondary` is equivalent to `secondary-4`.

---

## Colors Mapping

### **Brand Colors**
#### brand-01
- Range: `0` to `5`
- Mapping: `colooors["brand-01"][x] => accent-[x]`

#### brand-02
- Range: `0` to `5`
- Mapping: `colooors["brand-02"][x] => secondary-[x]`

---

### **Custom Colors**
#### cc-cases
- Range: `0` to `5`
- Mapping: `colooors["cc-cases"][x] => cc-cases-[x]`

#### cc-dictionary
- Range: `0` to `5`
- Mapping: `colooors["cc-dictionary"][x] => cc-dictionary-[x]`

#### cc-forum
- Range: `0` to `5`
- Mapping: `colooors["cc-forum"][x] => cc-forum-[x]`

---

### **Neutral Colors**
#### neutrals-01
- Range: `0` to `9`
- Mapping: `colooors["neutrals-01"][x] => cc-muted-[x]`

#### neutrals-02
- Range: `0` to `2`
- Mapping: `colooors["neutrals-02"][x] => cc-muted-[x+9]`

---

### **Support Colors**
#### support-error
- Range: `0` to `5`
- Mapping: `colooors["support-error"][x] => destructive-[x]`

#### support-notice
- Range: `0` to `5`
- Mapping: `colooors["support-notice"][x] => notice-[x]`

#### support-success
- Range: `0` to `5`
- Mapping: `colooors["support-success"][x] => success-[x]`

#### support-warning
- Range: `0` to `5`
- Mapping: `colooors["support-warning"][x] => warning-[x]`

---

### **Trandsparency**
#### transparency-01
- Range: `0` to `9`
- Mapping: `colooors["transparency-01"][x] => transparency-[x]`

#### transparency-02
- Range: `0` to `9`
- Mapping: `colooors["transparency-02"][x] => transparency-2-[x]`

#### transparency-03
- Range: `0` to `9`
- Mapping: `colooors["transparency-03"][x] => transparency-3-[x]`

## Component Mapping
### Button Variants
- `primary` => `default`
- `secondarySimple` => `secondary`
- `secondarySubtle` => `outline`
- `tertiary` => `ghost`