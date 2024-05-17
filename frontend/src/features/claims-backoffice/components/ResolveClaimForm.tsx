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
import DatePicker from "react-datepicker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SiTicktick } from "react-icons/si";
import { Claim } from "../../../models/Claim";
import { ClaimPaymentDTO } from "../../../models/ClaimPayment";
import { Currency } from "../../../models/Currency";

interface ResolveClaimFormProps {
  claim: Claim;
  onSubmit: (payment: ClaimPaymentDTO) => void;
}

interface FormData {
  amount: number;
  currency: Currency;
  payDay: Date;
}

const ResolveClaimForm: FC<ResolveClaimFormProps> = ({ claim, onSubmit }) => {
  const [currency, setCurrency] = useState<Currency>(Currency.BGN);
  const { register, formState, setValue, control, handleSubmit } =
    useForm<FormData>({
      defaultValues: {
        amount: 0,
        currency: Currency.BGN,
        payDay: new Date(),
      },
    });

  const processFormData: SubmitHandler<FormData> = (formData) => {
    const payment: ClaimPaymentDTO = {
      amount: formData.amount,
      amountCurrency: formData.currency,
      paymentDate: formData.payDay,
      claimId: claim.id,
    };
    onSubmit(payment);
  };

  return (
    <Form onSubmit={handleSubmit(processFormData)}>
      <Row>
        <Form.Group as={Col} md="6">
          <Form.Label>Sum for reimbursment</Form.Label>
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

        <Form.Group as={Col} md="6" className="mb-4 d-flex flex-column">
          <Form.Label>Event date</Form.Label>
          <Controller
            name="payDay"
            control={control}
            rules={{ required: "Required field" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date: Date) => field.onChange(date)}
                className={`form-control ${
                  formState.errors.payDay === undefined ? "" : "is-invalid"
                }`}
                placeholderText="Select a date"
              />
            )}
          />
          {formState.errors.payDay !== undefined && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {formState.errors.payDay?.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Row>
      <Button
        className="mx-4 d-inline-flex align-items-center"
        variant="success"
        type="submit"
      >
        Submit
        <SiTicktick className="ms-1" />
      </Button>
    </Form>
  );
};

export default ResolveClaimForm;
