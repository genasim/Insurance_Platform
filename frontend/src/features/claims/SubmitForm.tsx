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
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Claim } from "../../models/Claim";
import { ClaimDocument } from "../../models/ClaimDocument";
import { ClaimStatus } from "../../models/ClaimStatus";
import { Currency } from "../../models/Currency";
import { EventType } from "../../models/EventType";
import { IdType } from "../../models/Identifiable";
import { Policy } from "../../models/Policy";

interface SubmitFormProps {
  onSubmit: (claim: Claim, docs: ClaimDocument[]) => void;
  policy: Policy;
}

interface FormData {
  policyId: IdType;
  currencry: Currency;
  description: string;
  amount: string;
  type: EventType;
  eventDate: Date | null;
  files: {
    document: File;
    description: string;
  }[];
}

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result.toString());
      } else {
        reject(new Error("Error reading file"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL((file as unknown as FileList)[0]);
  });
};

const SubmitForm: FC<SubmitFormProps> = ({ policy, onSubmit }) => {
  const [currency, setCurrency] = useState<Currency>(Currency.BGN);

  const { register, control, handleSubmit, setValue, formState } =
    useForm<FormData>({
      defaultValues: {
        currencry: Currency.BGN,
        policyId: policy.id,
        description: "",
        amount: "",
        eventDate: null,
        files: [],
      },
    });

  const { fields, append, remove } = useFieldArray({ control, name: "files" });


  const processFormData: SubmitHandler<FormData> = async (formData) => {
    const claim: Claim = {
      claimedAmountCurrency: formData.currencry,
      claimedAmount: +formData.amount,
      eventDate: formData.eventDate!,
      eventType: formData.type,
      eventDescription: formData.description,
      policyId: policy.id,
      policyNumber: policy.policyNumber,
      claimantId: policy.holderId,
      status: ClaimStatus.SUBMITTED,
      submissionDate: new Date(),

      claimNumber: "1",
      id: "999",
    };

    const docs: ClaimDocument[] = await Promise.all(
      formData.files.map(async (file) => ({
        description: file.description,
        document: await readFileAsBase64(file.document),
        claimId: "999",
        claimNumber: "1",
        id: "kmk",
      }))
    );

    onSubmit(claim, docs);
  };

  return (
    <Form onSubmit={handleSubmit(processFormData)} className="my-5">
      <InputGroup className="w-50 mb-4">
        <InputGroup.Text>Policy #</InputGroup.Text>
        <Form.Control disabled value={policy.policyNumber} />
      </InputGroup>
      <Row>
        <Form.Group as={Col} md="4">
          <Form.Label>Sum for reimbursment</Form.Label>
          <InputGroup className="mb-4" as={Col} md="6">
            <InputGroup.Text className="p-0">
              <DropdownButton
                {...register("currencry")}
                onSelect={(eventKey) => {
                  const newCurr = (eventKey as Currency) ?? Currency.BGN;
                  setValue("currencry", newCurr);
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
              {...register("amount", {
                required: "Required field",
                valueAsNumber: true,
              })}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors.amount?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" className="mb-4">
          <Form.Label>Event Type</Form.Label>
          <InputGroup>
            <InputGroup.Text>Type</InputGroup.Text>
            <Form.Select
              isInvalid={formState.errors.type !== undefined}
              aria-label="Default select example"
              {...register("type", { required: "Required field" })}
            >
              <option></option>
              {Object.keys(EventType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formState.errors.type?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" className="mb-4 d-flex flex-column">
          <Form.Label>Event date</Form.Label>
          <Controller
            name="eventDate"
            control={control}
            rules={{ required: "Required field" }}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date: Date) => field.onChange(date)}
                className={`form-control ${
                  formState.errors.eventDate === undefined ? "" : "is-invalid"
                }`}
                placeholderText="Select a date"
              />
            )}
          />
          {formState.errors.eventDate !== undefined && (
            <Form.Control.Feedback type="invalid" className="d-block">
              {formState.errors.eventDate?.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
      </Row>
      <Form.Group className="mb-4">
        <Form.Label>Additional description:</Form.Label>
        <Form.Control
          {...register("description", { required: "Required field" })}
          isInvalid={formState.errors.description !== undefined}
          as="textarea"
          rows={3}
        />
        <Form.Control.Feedback type="invalid">
          {formState.errors.description?.message}
        </Form.Control.Feedback>
      </Form.Group>
      {fields.map((_, idx) => (
        <Form.Group key={idx} className="d-flex w-100 mb-4">
          <div className="flex-grow-1">
            <InputGroup>
              <Form.Control
                isInvalid={
                  formState.errors.files !== undefined &&
                  formState.errors.files[idx] !== undefined
                }
                className="rounded-end-0 rounded-bottom-0"
                {...register(`files.${idx}.document`, { required: true })}
                type="file"
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text className="rounded-top-0">
                Description:
              </InputGroup.Text>
              <Form.Control
                className="rounded-end-0"
                {...register(`files.${idx}.description`)}
                type="text"
              />
            </InputGroup>
          </div>
          <Button
            onClick={() => remove(idx)}
            variant="secondary"
            className="rounded-start-0"
          >
            <i className="bi bi-trash-fill"></i>
          </Button>
        </Form.Group>
      ))}
      <div>
        <Button
          variant="outline-primary"
          className="ms-4"
          onClick={() =>
            append({ description: "", document: new File([], "") })
          }
        >
          + Add file to claim
        </Button>
      </div>
      <Button variant="primary" className="m-5" size="lg" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SubmitForm;
