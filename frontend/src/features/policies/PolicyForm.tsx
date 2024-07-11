import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { CalculationCoefficient_ } from "../../models/CalculationCoefficient";
import { PolicyDto, Policy_ } from "../../models/Policy";
import { PolicyPackage_ } from "../../models/PolicyPackage";
import { PolicyType } from "../../models/PolicyType";
import useAsyncEffect from "../../shared/hooks/useAsyncEffect";
import useService from "../../shared/hooks/useService";
import Services from "../../shared/enums/Services";

interface PolicyFormProps {
  policy?: Policy_;
  onSubmit: (policy: PolicyDto) => void;
}

interface FormData {
  type: PolicyType;
  packageId: string;
  coefficients: number[];
  beginDate: string;
}

const format = "YYYY-MM-DD";

const formSchema = yup.object({
  type: yup
    .string()
    .required("Required field")
    .oneOf(Object.values(PolicyType)),
  packageId: yup.string().required("Required field"),
  coefficients: yup
    .array()
    .of(yup.number().required())
    .required("Required field"),
  beginDate: yup
    .string()
    .required("Required field")
    .test(
      "date validation",
      `Invalid date or format. The string should be a valid ${format} format.`,
      (val) => {
        if (!val) {
          return true;
        }
        return moment(val, format, true).isValid();
      }
    ),
});

const PolicyForm: FC<PolicyFormProps> = ({ onSubmit, policy }) => {
  const { register, handleSubmit, watch, formState } = useForm<FormData>({
    defaultValues: {
      type: policy?.type ?? PolicyType.CAR_INSURANCE,
      packageId: policy?.packageId ?? "",
      coefficients: [],
      beginDate: policy?.beginDate ?? moment().toString(),
    },
    mode: "onBlur",
    resolver: yupResolver(formSchema),
  });

  const [packages, setPackages] = useState<PolicyPackage_[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<PolicyPackage_>();
  const [coefficients, setCoefficients] = useState<CalculationCoefficient_[]>(
    []
  );
  const [endPremium, setEndPremium] = useState(0);
  const [endDate, setEndDate] = useState<string>();

  const getPolicyTypeCoefficients = useService(Services.GetPolicyTypeCoefficients)
  const getPolicyTypePackages = useService(Services.GetPolicyTypePackages)

  const type = watch("type");
  const selectedCoefficients = watch("coefficients");
  const beginDate = watch("beginDate");

  useAsyncEffect(async () => {
    try {
      const packs = await getPolicyTypePackages({ params: { type } });
      const coeffs = await getPolicyTypeCoefficients({ params: { type } });
      
      setPackages(packs);
      setCoefficients(coeffs);
    } catch (error) {}
  }, [type]);

  const coeffsString = selectedCoefficients.toString();
  useEffect(() => {
    if (selectedPackage) {
      const totalPremium = selectedCoefficients.reduce(
        (acc, coef) => acc * coef,
        1
      );
      setEndPremium(totalPremium);
    }
  }, [selectedPackage, coeffsString, selectedCoefficients]);

  useEffect(() => {
    setEndDate(() =>
      moment(new Date(beginDate).toISOString())
        .add(selectedPackage?.duration, selectedPackage?.durationUnit)
        .format(format)
        .toString()
    );
  }, [beginDate, selectedPackage?.duration, selectedPackage?.durationUnit]);

  const processFormData: SubmitHandler<FormData> = async (formData) => {
    const policyDto: PolicyDto = {
      type: formData.type,
      packageId: formData.packageId,
      beginDate: formData.beginDate,
      coefficients: coefficients.map((coefficient, idx) => ({
        id: coefficient._id,
        value: +selectedCoefficients[idx],
      })),
    };

    onSubmit(policyDto);
  };

  return (
    <Form onSubmit={handleSubmit(processFormData)}>
      <Row className="mb-4">
        <Form.Group as={Col} className="mb-4">
          <Form.Label>Policy type</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-braces"></i>
            </InputGroup.Text>
            <Form.Select
              isInvalid={formState.errors.type !== undefined}
              aria-label="Default select example"
              {...register("type")}
            >
              <option disabled value={""}>
                -- select one option --
              </option>
              {Object.keys(PolicyType).map((type) => (
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

        <Col md={2} />

        <Form.Group as={Col} className="mb-4">
          <Form.Label>Policy package</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="bi bi-braces"></i>
            </InputGroup.Text>
            <Form.Select
              isInvalid={formState.errors.packageId !== undefined}
              aria-label="Default select example"
              {...register("packageId")}
              onChange={(event) => {
                const selected = packages.find(
                  (pack) => pack._id === event.target.value
                );
                setSelectedPackage(selected);
              }}
            >
              <option disabled value={""}>
                -- select one --
              </option>
              {packages.map((pack) => (
                <option key={pack._id} value={pack._id}>
                  {pack.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formState.errors.packageId?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <h4 className="mb-3">Package Details</h4>
      <Row className="mb-4">
        <Col>
          <div className="mb-4">
            <p className="mb-1">
              <b>Package name: </b>
              {selectedPackage?.name}
            </p>
            <p className="mb-1">
              <b>Package duration: </b>
              {selectedPackage?.duration} {selectedPackage?.durationUnit}
            </p>
          </div>
          <h4> Coverages:</h4>
          <ul>
            {selectedPackage?.coverage.map((cover) => (
              <li key={cover}>{cover}</li>
            ))}
          </ul>
        </Col>

        <Col>
          {selectedPackage && (
            <>
              <h4 className="mb-3">Coefficients:</h4>
              {coefficients.map((coefficient, idx) => (
                <Form.Group className="mb-2" key={coefficient._id}>
                  <InputGroup>
                    <InputGroup.Text>{coefficient.description}</InputGroup.Text>
                    <Form.Select
                      className="text-end"
                      isInvalid={formState.errors.packageId !== undefined}
                      aria-label="Default select example"
                      {...register(`coefficients.${idx}`)}
                    >
                      <option disabled value={0}>
                        -- select one --
                      </option>
                      {coefficient.values.map((value) => (
                        <option key={value.value} value={+value.value}>
                          {value.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.packageId?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              ))}
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-4">
            <Form.Label>Begin date</Form.Label>
            <Form.Control
              {...register("beginDate")}
              type="date"
              isInvalid={formState.errors.beginDate !== undefined}
            />
            <Form.Control.Feedback type="invalid">
              {formState.errors.beginDate?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Base Premium</Form.Label>
            <Form.Control
              disabled
              value={
                (selectedPackage?.basePremium ?? 0) +
                ` ${selectedPackage?.basePremiumCurrency ?? ""}`
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-4">
            <Form.Label>End date</Form.Label>
            <Form.Control disabled type="date" value={endDate} />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Premium</Form.Label>
            <Form.Control
              disabled
              value={`${(
                (selectedPackage?.basePremium ?? 0) * endPremium
              ).toFixed(2)} ${selectedPackage?.basePremiumCurrency ?? ""}`}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button className="m-4" type="submit" variant="success">
        Purchase Policy
      </Button>
    </Form>
  );
};

export default PolicyForm;
