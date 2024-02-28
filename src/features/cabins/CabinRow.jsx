import styled from "styled-components";
import { useState } from "react";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useDuplicateCabin } from "./useDuplicateCabin";
import CreateCabinForm from "./CreateCabinForm";

import Button from "../../ui/Button";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 100px 1.8fr 2.2fr 1fr 1fr 150px;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 3rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    id: cabinId,
    name,
    image,
    max_capacity: maxCapacity,
    regular_price: regularPrice,
    discount,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isLoading: isDuplicating, duplicateCab } = useDuplicateCabin();

  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>
          {discount === 0 ? <span>&mdash;</span> : formatCurrency(discount)}
        </Discount>
        <Buttons>
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <HiPencil />
            </Button>
          )}
          {showForm && (
            <Button variation="tertiary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          )}
          <Button
            variation="secondary"
            onClick={() => duplicateCab(cabinId)}
            disabled={isDuplicating}
          >
            <HiSquare2Stack />
          </Button>
          <Button
            variation="danger"
            onClick={() => deleteCabin(cabinId)}
            disabled={isDeleting}
          >
            <HiTrash />
          </Button>
        </Buttons>
      </TableRow>
      {showForm && (
        <CreateCabinForm cabinToEdit={cabin} setShowForm={setShowForm} />
      )}
    </>
  );
}

export default CabinRow;
