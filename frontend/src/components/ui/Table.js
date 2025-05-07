import * as React from 'react';

const Table = ({ className, ...props }) => (
  <div className="w-full overflow-auto">
    <table className="w-full caption-bottom text-sm" {...props} />
  </div>
);

const TableHeader = ({ className, ...props }) => (
  <thead className="[&_tr]:border-b" {...props} />
);

const TableBody = ({ className, ...props }) => (
  <tbody className="[&_tr:last-child]:border-0" {...props} />
);

const TableFooter = ({ className, ...props }) => (
  <tfoot className="bg-primary font-medium text-primary-foreground" {...props} />
);

const TableRow = ({ className, ...props }) => (
  <tr
    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
    {...props}
  />
);

const TableHead = ({ className, ...props }) => (
  <th
    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
    {...props}
  />
);

const TableCell = ({ className, ...props }) => (
  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0" {...props} />
);

const TableCaption = ({ className, ...props }) => (
  <caption className="mt-4 text-sm text-muted-foreground" {...props} />
);

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};