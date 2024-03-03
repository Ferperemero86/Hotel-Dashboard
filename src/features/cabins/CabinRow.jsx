import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useDuplicateCabin } from "./useDuplicateCabin";
import CreateCabinForm from "./CreateCabinForm";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";

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
  const {
    id: cabinId,
    name,
    image,
    max_capacity: maxCapacity,
    regular_price: regularPrice,
    discount,
  } = cabin;

  const { deleteCabin } = useDeleteCabin();
  const { duplicateCab } = useDuplicateCabin();

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>
          {discount === 0 ? <span>&mdash;</span> : formatCurrency(discount)}
        </Discount>
        <Buttons>
          <Modal>
            <Modal.Open opens="edit">
              <Button>
                <HiPencil />
              </Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>

          <Button variation="secondary" onClick={() => duplicateCab(cabinId)}>
            <HiSquare2Stack />
          </Button>
          <Modal>
            <Modal.Open opens="delete">
              <Button variation="danger">
                <HiTrash />
              </Button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </Buttons>
      </Table.Row>
    </>
  );
}

export default CabinRow;
