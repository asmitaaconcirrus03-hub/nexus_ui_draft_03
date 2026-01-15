# nexus_ui_draft_03

## Nexus UI - Execution Roadmap

This project contains TypeScript type definitions, Vue 3 composables, and components for the Nexus product execution roadmap interface.

### Project Structure

```
nexus_ui_draft_03/
├── src/
│   ├── types/
│   │   ├── ExecutionItem.ts                    # Core type definitions
│   │   ├── ExecutionItemsApiResponse.ts        # API response types
│   │   ├── OKRHierarchy.ts                     # OKR structure types
│   │   └── TableSortConfig.ts                  # Table sorting types
│   ├── composables/
│   │   ├── useExecutionItems.ts                # Data fetching composable
│   │   ├── useHealthStatus.ts                  # Health status utilities
│   │   └── __tests__/                          # Composable unit tests
│   └── tests/
│       ├── setup.ts                            # Vitest configuration
│       └── types.validation.test.ts            # Type validation tests
├── .env.example                                 # Environment variables template
├── package.json
├── tsconfig.json
├── vitest.config.ts                             # Vitest configuration
└── README.md
```

---

## Features

### Type Definitions

#### `HealthStatus`

Union type representing the health status of an execution item:
- `'on-track'` - Healthy progress (green badge: #0ed183)
- `'at-risk'` - Potential delays (red badge: #ff514e)
- `'off-track'` - Significant blockers (orange badge: #ffab26)

#### `ExecutionItem`

Interface representing a work item in the execution roadmap:

```typescript
interface ExecutionItem {
  moduleName: string;      // Module/feature name
  owner: string;           // Person responsible
  pm: string;              // Product Manager
  healthStatus: HealthStatus;  // Current status
  teamWorking: string;     // Team/squad name
  okrHierarchy: string;    // OKR hierarchical path
}
```

#### `ExecutionItemsApiResponse`

API response interface for fetching execution items:

```typescript
interface ExecutionItemsApiResponse {
  items: ExecutionItem[];  // Array of execution items
  total: number;           // Total count
  page?: number;           // Current page (for pagination)
  limit?: number;          // Items per page (for pagination)
}
```

---

### Vue 3 Composables

#### `useExecutionItems()`

Composable for fetching and managing execution items data with reactive state.

**Features:**
- Automatic data fetching on component mount
- Reactive loading, error, and data states
- Manual refetch functionality
- Health status classification integration
- Environment-based API configuration

**Usage:**

```typescript
import { useExecutionItems } from '@/composables/useExecutionItems';

export default {
  setup() {
    const { items, loading, error, refetch } = useExecutionItems();

    return { items, loading, error, refetch };
  }
}
```

**Return Values:**
- `items: Readonly<Ref<ExecutionItem[]>>` - Array of execution items
- `loading: Readonly<Ref<boolean>>` - Loading state indicator
- `error: Readonly<Ref<string | null>>` - Error message if fetch failed
- `refetch: () => Promise<void>` - Function to manually refetch data

---

#### `useHealthStatus()`

Composable for health status classification and UI configuration.

**Features:**
- Health status classification
- Status validation
- UI styling configuration (colors, labels, severity)
- Figma design system alignment

**Usage:**

```typescript
import { useHealthStatus } from '@/composables/useHealthStatus';

const { classifyStatus, getStatusConfig, isValidStatus } = useHealthStatus();

// Classify an item
const status = classifyStatus(item);

// Get styling config
const config = getStatusConfig(status);
console.log(config.color); // '#0ed183'

// Validate status
if (isValidStatus('on-track')) {
  // Valid status
}
```

**Return Values:**
- `classifyStatus(item: ExecutionItem): HealthStatus`
- `getStatusConfig(status: HealthStatus): HealthStatusConfig`
- `isValidStatus(value: string): boolean`
- `getAllStatuses(): HealthStatus[]`
- `HEALTH_STATUS_CONFIG: Record<HealthStatus, HealthStatusConfig>`

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set your API configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_API_EXECUTION_ITEMS_ENDPOINT=/api/v1/execution-items
   ```

---

## Development

### Type Checking

```bash
npm run type-check
```

### Build

```bash
npm run build
```

### Testing

**Run all tests:**
```bash
npm test
```

**Watch mode (for development):**
```bash
npm run test:watch
```

**Test UI (interactive):**
```bash
npm run test:ui
```

**Coverage report:**
```bash
npm run test:coverage
```

---

## Testing Infrastructure

### Vitest

Modern, fast unit test framework for Vue 3 and TypeScript.

**Features:**
- Vue 3 component testing with `@vue/test-utils`
- TypeScript support
- Fast watch mode
- Coverage reporting
- Happy DOM for DOM simulation

### Mock Service Worker (MSW)

API mocking for realistic integration testing.

**Features:**
- Network-level API mocking
- No dependency injection required
- Works in tests and browser
- Realistic HTTP response simulation

**Test Coverage:**
- ✅ `useHealthStatus` - 100% coverage
- ✅ `useExecutionItems` - Comprehensive coverage including:
  - Successful data fetching
  - Loading state management
  - Error handling (network, HTTP, validation)
  - Data normalization
  - Refetch functionality
  - Environment configuration

---

## API Integration

### Backend Requirements

The backend API must provide a `GET` endpoint that returns data matching the `ExecutionItemsApiResponse` interface:

**Endpoint:** `${VITE_API_BASE_URL}${VITE_API_EXECUTION_ITEMS_ENDPOINT}`

**Response Format:**
```json
{
  "items": [
    {
      "moduleName": "Authentication Module",
      "owner": "John Doe",
      "pm": "Jane Smith",
      "healthStatus": "on-track",
      "teamWorking": "Squad 1",
      "okrHierarchy": "O1 > KR1 > Initiative A"
    }
  ],
  "total": 1
}
```

**Optional Pagination:**
```json
{
  "items": [...],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

---

## Design Reference

Types and composables are based on the Execution Roadmap design in Figma:
- [Figma Design Link](https://www.figma.com/design/oMcDyzsbYyZOOwUpvqFyYK/Untitled?node-id=33-4155)

**Design Alignment:**
- Health status colors match Figma specification
- ExecutionItem structure mirrors table columns
- Status badges use exact color values from design system

---

## Technology Stack

- **Vue:** 3.4.21
- **TypeScript:** 5.3.0+
- **Vitest:** 1.3.1
- **MSW:** 2.2.1
- **Vite:** 5.1.5
- **Target:** ES2020
- **Module System:** ESNext
- **Strict Mode:** Enabled

---

## Task Reference

### Completed Tasks

**Task 1:** Create ExecutionItem and HealthStatus type definitions  
**Status:** ✅ Completed  
**Priority:** High

**Task 2:** Create ExecutionItemsApiResponse type definition  
**Status:** ✅ Completed  
**Priority:** High

**Task 4:** Create data fetching composable with API integration  
**Status:** ✅ Completed  
**Priority:** High  
**Deliverables:**
- `useExecutionItems` composable
- `useHealthStatus` composable
- Comprehensive unit tests with MSW
- Environment-based configuration
- Full documentation

---

## Contributing

When adding new features:

1. **Add TypeScript types** in `src/types/`
2. **Create composables** in `src/composables/`
3. **Write comprehensive tests** in `src/composables/__tests__/`
4. **Update this README** with usage examples
5. **Ensure type safety** - run `npm run type-check`
6. **Verify test coverage** - run `npm run test:coverage`

---

*This project is part of the Nexus UI initiative.*
