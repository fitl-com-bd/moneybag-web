# Project Overview: Moneybag Merchant Portal

## Project Name
Moneybag Merchant Portal (Next.js)

## Description
The Moneybag Merchant Portal is a web application built using Next.js. It serves as a platform for merchants and administrators to manage various aspects of their business, including dashboards, customer management, transactions, and settlements. The project is structured to support both merchant and admin functionalities with a modular and scalable architecture.

## Key Features
- Merchant and Admin Dashboards
- Authentication and Authorization
- Customer Management
- Transaction and Settlement Reports
- Integration Details
- Role and Permission Management

## Project Structure
The project follows a modular structure with the following key directories:

- **app/**: Contains the main application pages and layouts for merchants and admins.
  - `(merchant)/`: Merchant-specific pages and components.
  - `admin/`: Admin-specific pages and components.
- **components/**: Reusable UI components and layouts.
  - `layouts/`: Layout components like `DashboardLayout`.
  - `providers/`: Context providers like `StoreProvider` and `ToasterProvider`.
  - `shared/`: Shared components like `DataTable` and `AdvanceFilter`.
  - `ui/`: UI components like `Button`, `Card`, and `Tabs`.
- **config/**: Configuration files.
- **constants/**: Application constants.
- **hooks/**: Custom React hooks.
- **public/**: Static assets like images and icons.
- **store/**: Contains Redux-related files and configurations.
  - `config.ts`: Base query configuration for RTK Query.
  - `entities.ts`: Entity-specific reducers and configurations.
  - `index.ts`: Entry point for the store.
  - `reducer.ts`: Combines all reducers, including those from RTK Query APIs.
  - `features/`: Contains feature-specific logic.
    - `api/`: Houses all API-related files using RTK Query.
      - Each file defines a specific API slice (e.g., `authApi`, `customerApi`).
      - These slices are added to the reducer in `reducer.ts`.
    - `slices/`: Contains Redux slices for managing local state (e.g., `sidebarSlice`, `sweetAlertSlice`).
  - `middleware/`: Custom middleware for Redux (e.g., `toast.ts`).
- **styles/**: SCSS stylesheets.
- **types/**: TypeScript type definitions.
- **utils/**: Utility functions.

## Dependencies
The project uses the following key dependencies:

- **Next.js**: Framework for server-side rendering and static site generation.
- **React**: Frontend library for building user interfaces.
- **Redux Toolkit**: State management.
- **RTK Query**: Data fetching and caching.
- **Sass**: CSS preprocessor.
- **CoreUI**: UI components and charting library.
- **ApexCharts**: Charting library.
- **React Hook Form**: Form management.
- **SweetAlert2**: Alert and modal library.

## Development Scripts
- `dev`: Starts the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for code quality issues.

## Development Environment
- **Node.js**: Ensure you have Node.js installed.
- **Package Manager**: Use `npm` or `yarn` to manage dependencies.
- **Operating System**: Linux (current environment).

## Notes
- The project uses TypeScript for type safety.
- SCSS is used for styling.
- The `public/` directory contains static assets like icons and images.

## Future Reference
This file provides a high-level overview of the project. For detailed information, refer to the respective directories and files.

## Pages

### List Pages Overview

#### Example: `app/admin/dashboard/banks/page.tsx`
List pages are designed to display tabular data fetched from APIs using RTK Query. These pages typically use the `DataTablePage` component, which provides a standardized structure for rendering data tables. Key features of list pages include:

- **Columns Definition**: Columns are defined using the `DataTableColumn` type, specifying how each field in the data should be displayed.
- **API Integration**: Data is fetched using RTK Query hooks (e.g., `useBanksQuery`) and passed to the `DataTablePage` component.
- **Actions**: List pages often include action buttons (e.g., edit, delete) for each row, implemented using components like `CTooltip` and `CButton`.
- **Reusable Components**: The `DataTablePage` component handles common functionalities like search, filters, and pagination, ensuring consistency across list pages.

### Create Pages Overview

#### Example: `app/admin/dashboard/banks/create/page.tsx`
Create pages in the project are designed as multi-step forms, where each step is represented as a tab. These pages provide a structured way to collect and manage data across multiple sections. The `Tabs` component is used to manage the navigation between steps, ensuring a seamless user experience.

#### Key Features of Create Pages
- **Multi-Step Form**: Each step is represented as a tab, allowing users to navigate between sections.
- **State Management**: State is managed locally using React's `useState` hook to track the active tab and form data.
- **Reusable Components**: Each tab is implemented as a separate component, ensuring modularity and reusability.

#### Individual Tab Structure

1. **Bank Information Tab**
   - **File**: `app/admin/dashboard/banks/create/_components/BankInformation.tsx`
   - **Purpose**: Collects basic information about the bank, such as name, alias, Swift code, and contact details.
   - **Key Features**:
     - Uses `react-hook-form` for form validation and management.
     - Includes fields for bank name, short name, Swift code, phone numbers, email, website, and customer support number.
     - Provides radio buttons for selecting the bank's status (active/inactive).

2. **Add Branch Tab**
   - **File**: `app/admin/dashboard/banks/create/_components/AddBranch.tsx`
   - **Purpose**: Collects information about the bank's branches, such as branch name, routing number, and account details.
   - **Key Features**:
     - Uses `react-hook-form` for form validation and management.
     - Includes fields for branch name, routing number, Swift code, account name, account number, and notes.
     - Fetches branch and bank data using RTK Query hooks (e.g., `useBanksQuery`, `useAllBranchesQuery`).

#### Navigation and State Management
- The `Tabs` component is used to render the tabs and manage navigation between them.
- The `activeTab` state tracks the currently active tab.
- The `setId` and `changeTab` functions are used to manage the flow of data and navigation between tabs.

## Components

### DataTable Component Overview
The `DataTable` component is a reusable and customizable table component used across the project. It is designed to handle various functionalities like search, filters, status options, and pagination. Below are the key sub-components and their roles:

#### 1. **DataTableActions**
- Provides action buttons (e.g., Add New, Edit, Delete) and search functionality.
- Supports status filtering with dropdowns.
- Integrates seamlessly with the `DataTablePage` component.

#### 2. **DataTableFilter**
- Allows advanced filtering of data based on multiple fields.
- Uses `react-hook-form` for form management.
- Includes reset and filter submission functionalities.

#### 3. **DataTable**
- The core table component built on top of `react-data-table-component`.
- Supports pagination, loading states, and dynamic data rendering.

#### 4. **DataTablePage**
- A higher-level component that integrates API calls, search, filters, and status options into a single table view.
- Uses RTK Query to fetch data dynamically based on parameters like search keys and filters.
- Combines `DataTable`, `DataTableActions`, and `DataTableFilter` to provide a complete data table solution.

### Column Definitions

In the project, column definitions for data tables are structured using the `DataTableColumn` type. Each column specifies how a particular field in the data should be displayed. Below are some key practices and conventions used in column definitions:

1. **Action Column**
   - The last column in most tables is an "Action" column.
   - This column provides buttons or links for performing actions like editing or deleting a row.
   - Example: In the settlements table, the "Action" column includes an edit button wrapped in a tooltip for better user experience.

2. **Date Formatting**
   - For date fields, the `moment` library is used to format dates into a human-readable format (e.g., `moment(row.transaction_date).format("lll")`).
   - This ensures consistency in how dates are displayed across the application.

3. **Price Formatting**
   - For price or monetary fields, the `formatPrice` utility function is used.
   - This function ensures that prices are displayed with two decimal places for clarity and consistency.

## API Definitions

#### Bank API
The `bankApi` file defines the API endpoints for managing banks and their branches. It uses RTK Query for data fetching and caching. Below are the key endpoints:

1. **Banks**
   - **Endpoint**: `banks/`
   - **Type**: Query
   - **Description**: Fetches a list of banks.
   - **Hook**: `useBanksQuery`

2. **All Branches**
   - **Endpoint**: `banks/all-branches`
   - **Type**: Query
   - **Description**: Fetches all branches of banks.
   - **Hook**: `useAllBranchesQuery`

3. **Create Bank**
   - **Endpoint**: `banks/`
   - **Type**: Mutation
   - **Description**: Creates a new bank.
   - **Hook**: `useCreateBankMutation`

These APIs are integrated into the `BankInformation` and `AddBranch` components for creating and managing bank details.

## Coding Structure and Conventions

#### General Coding Practices
- **Arrow Functions**: We prefer using arrow functions over traditional function declarations for consistency and brevity.

#### Directory Structure
- **Page-Specific Components**: Components related to a specific page are placed inside the `_components` directory within the respective page directory.
- **Named Exports**: Most components and utilities are exported using named exports, except for the main page files which use default exports.
- **Index Files**: Each directory contains an `index.ts` file that re-exports all the files within the directory. This helps in avoiding long and complex import paths.

#### Import Practices
- **Path Aliases**: We use path aliases (e.g., `@/components`) for cleaner and more maintainable imports, as configured in the `tsconfig.json` file.

## JavaScript Version
The project uses modern JavaScript (ESNext) as specified in the `tsconfig.json` file. This includes the latest ECMAScript features supported by the Next.js framework. Note that semicolons are not used in this project, following a specific coding style preference.
