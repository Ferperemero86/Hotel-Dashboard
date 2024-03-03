import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

export default function CabinTableOperations() {
  return (
    <div>
      <TableOperations>
        <Filter
          filterField="discount"
          options={[
            {
              value: "all",
              label: "All",
            },
            {
              value: "with-discount",
              label: "With discount",
            },
            {
              value: "no-discount",
              label: "No discount",
            },
          ]}
        />
      </TableOperations>
    </div>
  );
}
