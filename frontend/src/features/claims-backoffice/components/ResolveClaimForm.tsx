import { FC, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { SiTicktick } from "react-icons/si";
import { Claim_ } from "../../../models/Claim";
import { ClaimPaymentDTO } from "../../../models/ClaimPayment";
import { Currency } from "../../../models/Currency";

interface ResolveClaimFormProps {
  claim: Claim_;
  onSubmit: (payment: ClaimPaymentDTO) => void;
}

interface FormData {
  amount: number;
  currency: Currency;
}

const ResolveClaimForm: FC<ResolveClaimFormProps> = ({ claim, onSubmit }) => {
  const [currency, setCurrency] = useState<Currency>(Currency.BGN);
  const { register, formState, setValue, handleSubmit } =
    useForm<FormData>({
      defaultValues: {
        amount: 0,
        currency: Currency.BGN,
      },
    });

  const processFormData: SubmitHandler<FormData> = (formData) => {
    const payment: ClaimPaymentDTO = {
      amount: formData.amount,
      amountCurrency: formData.currency,
      claimId: claim._id,
      paymentDate: new Date(),
    };
    onSubmit(payment);
  };

  return (
    <Form onSubmit={handleSubmit(processFormData)}>
      <Row>
        <Form.Group as={Col} md="6">
          <Form.Label>Approved amount</Form.Label>
          <InputGroup className="mb-4" as={Col} md="6">
            <InputGroup.Text className="p-0">
              <DropdownButton
                {...register("currency")}
                onSelect={(eventKey) => {
                  const newCurr = (eventKey as Currency) ?? Currency.BGN;
                  setValue("currency", newCurr);
                  setCurrency(newCurr);
                }}
                title={currency}
                variant="transparent"
              >
                {Object.keys(Currency).map((curr) => (
                  <Dropdown.Item key={curr} eventKey={curr}>
                    {curr}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </InputGroup.Text>
            <Form.Control
              isInvalid={formState.errors.amount !== undefined}
              type="number"
              step={0.01}
              {...register("amount", {
                required: "Required field",
                validate: (amount: number) => amount !== 0 || "Required field",
                valueAsNumber: true,
              })}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors.amount?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Button
        className="mx-4 d-inline-flex align-items-center"
        variant="success"
        type="submit"
      >
        Approve
        <SiTicktick className="ms-1" />
      </Button>
    </Form>
  );
};

export default ResolveClaimForm;
