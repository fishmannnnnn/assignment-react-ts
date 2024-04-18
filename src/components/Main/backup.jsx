import styles from "./MainForm.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  number: yup
    .string()
    .required("Обязательное поле")
    .matches(
      /^\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/,
      "Некорректный номер телефона"
    ),
  email: yup
    .string()
    .required("Обязательное поле")
    .email("Некорректный email адрес")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
      "Некорректный email адрес"
    ),
});

const MainForm = () => {
  const navigate = useNavigate();
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        number: "",
        email: "",
      }}
      onSubmit={(values) => {
        console.log(values);
        navigate("/form");
      }}
    >
      {() => (
        <Form>
          <div className={styles.label}>
            <label className={styles.labelNumber} htmlFor="number">
              Номер телефона
            </label>
            <Field name="number">
              {({ field, form }) => (
                <div>
                  <InputMask
                    className={styles.field}
                    {...field}
                    mask="+7 (999) 999-99-99"
                    placeholder="+7 (999) 999-99-99"
                    onChange={(e) => {
                      field.onChange(e);
                      form.setFieldTouched(field.name, true, false);
                    }}
                  />
                </div>
              )}
            </Field>
            <ErrorMessage
              name="number"
              component={Form}
              className={styles.error}
            />
          </div>
          <div className={styles.label}>
            <label className={styles.labelEmail} htmlFor="email">
              Email
            </label>
            <Field
              className={styles.field}
              name="email"
              placeholder="webstudio.fractal@example.com"
            />
            <ErrorMessage
              name="email"
              component={Form}
              className={styles.error}
            />
          </div>
          <button className={styles.button} id="button-start" type="submit">
            Начать
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MainForm;
