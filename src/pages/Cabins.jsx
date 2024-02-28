import { useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";

import CreateCabinForm from "../features/cabins/CreateCabinForm";

//import { getCabins } from "../services/apiCabins";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
      </Row>

      <Row>
        <CabinTable />
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>Add new cabin</Button>
        )}
        {showForm && (
          <Button variation="tertiary" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
        )}

        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
