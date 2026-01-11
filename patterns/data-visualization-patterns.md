# Data Visualization Patterns

Guidelines for displaying data effectively in the CSS Design System.

## Table of Contents

- [Stat Cards](#stat-cards)
- [Charts Guidelines](#charts-guidelines)
- [Data Tables](#data-tables)
- [Color Usage in Data](#color-usage-in-data)

---

## Stat Cards

Display key metrics prominently.

```tsx
function StatCard({ label, value, change, trend }) {
  return (
    <Card>
      <Card.Content className="pt-6">
        <p className="text-sm text-neutral-500">{label}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
        {change && (
          <div className={cn(
            'flex items-center gap-1 mt-2 text-sm',
            trend === 'up' ? 'text-success-600' : 'text-error-600'
          )}>
            {trend === 'up' ? <ArrowUpIcon /> : <ArrowDownIcon />}
            <span>{change}</span>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}

// Usage
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard label="Total Revenue" value="$45,231" change="+12.5%" trend="up" />
  <StatCard label="Orders" value="1,234" change="+8.2%" trend="up" />
  <StatCard label="Customers" value="891" change="-2.1%" trend="down" />
  <StatCard label="Avg. Order" value="$52.50" change="+3.4%" trend="up" />
</div>
```

---

## Charts Guidelines

### Color Palette for Charts

Use these colors for data visualization:

```tsx
const chartColors = {
  primary: '#1b2a53',    // Primary data
  secondary: '#356a9d',  // Secondary data
  tertiary: '#5a9ac4',   // Tertiary data
  quaternary: '#80b4d6', // Additional data
  success: '#22c55e',    // Positive values
  error: '#ef4444',      // Negative values
  neutral: '#94a3b8',    // Neutral/comparison
};
```

### Accessibility in Charts

- Never rely on color alone
- Use patterns or labels
- Provide data tables as alternatives
- Ensure sufficient contrast

---

## Data Tables

### Sortable Table

```tsx
<DataTable
  columns={[
    {
      id: 'name',
      header: 'Name',
      accessor: 'name',
      sortable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessor: 'status',
      cell: ({ value }) => (
        <Badge variant={value === 'active' ? 'success' : 'warning'}>
          {value}
        </Badge>
      ),
    },
    {
      id: 'amount',
      header: 'Amount',
      accessor: 'amount',
      align: 'right',
      cell: ({ value }) => formatCurrency(value),
    },
  ]}
  data={data}
  striped
  hoverable
/>
```

---

## Color Usage in Data

| Context | Color | Token |
|---------|-------|-------|
| Positive change | Green | `success-500` |
| Negative change | Red | `error-500` |
| Neutral | Gray | `neutral-500` |
| Primary metric | Navy | `primary-600` |
| Secondary metric | Sky blue | `secondary-600` |
