import styles from './FormPage.module.css';
import { ReactNode, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as yup from 'yup';
import { Navigate, useNavigate } from 'react-router-dom';
import current from '../../assets/dot-current.svg';
import grey from '../../assets/dot-grey.svg';
import success from '../../assets/dot-success.svg';
import add from '../../assets/add.svg';
import trash from '../../assets/trash.svg';
import SuccessModal from '../modals/success/SuccessModal.js';
import FailureModal from '../modals/success/SuccessModal.js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setShowSuccessModal, setShowFailureModal, setData, selectForm } from '../../redux/slice.js';

enum Sex {
  Man = 'man',
  Woman = 'woman',
}
interface FormData {
  nickname: string;
  name: string;
  surname: string;
  sex: Sex;
  advantages: string[];
  checkbox: string[];
  radio: string;
  about: string;
}
function submitForm(formData: FormData): Promise<{ success: boolean }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API request
      const apiResponse = { success: true /* false */ };
      if (apiResponse.success) {
        resolve(apiResponse);
      } else {
        reject(new Error('Failed to submit form'));
      }
      // or 
      // axios.post('https://www.server.com/api/v2', formData)
      //   .then(res=>resolve(res.data))
      //   .catch(e=>reject(e))
    }, 1000);
  });
}

const FormPage: React.FC = () => {
  // const dispatch = useDispatch
  // const { dataFinal } = useSelector(selectForm);
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [data, setData] = useState<FormData>({
    nickname: "",
    name: "",
    surname: "",
    sex: Sex.Man,
    advantages: ['', '', ''],
    checkbox: [],
    radio: "",
    about: ""
  });
  
  
  const makeRequest = (formData: FormData) => {
    console.log('submitted', formData);
  };

  const [step, setStep] = useState<number>(2);

  const handleNextStep = (newData: Partial<FormData>, final = false) => {
    setData(prev => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData as FormData);
      setFormSubmitted(true);
      
      submitForm(data)
        .then(response => {
          console.log('Form submitted successfully:', response);
          setShowSuccessModal(true);
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          setShowSuccessModal(false);
        });

      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = (newData: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...newData }));
    //dispatch(setData(newData as FormData));
    setStep(prev => prev - 1);
  };

  const steps = [
    <Step1 next={handleNextStep} data={data} />,
    <Step2 prev={handlePrevStep} next={handleNextStep} data={data} />,
    <Step3 prev={handlePrevStep} next={handleNextStep} data={data} submitted={formSubmitted} successModal={showSuccessModal}/>
  ];

  console.log("data: ", data);

  return (
    <div className={styles.boxContainer}>
      <div className={styles.stepper}>
        <div className={styles.lines}>
          <div className={step > 0 ? styles.lineActive : styles.line}></div>
          <div className={step > 1 ? styles.lineActive : styles.line}></div>
        </div>
        <div className={styles.dots}>
          <img className={styles.dot} src={step === 0 ? current : success} />
          <img className={styles.dot} src={step < 1 ? grey : step === 1 ? current : success} />
          <img className={styles.dot} src={step < 2 ? grey : current} />
        </div>
      </div>
      <div className={styles.container}>
        {steps[step]}
      </div>
    </div>
  );
};

const Step1ValidationSchema = yup.object({
  nickname: yup.string()
    .required('Обязательное поле')
    .max(30, 'Максимальная длина 30 символов')
    .matches(/^[a-zA-Z0-9]+$/, 'Допустимы только латинские буквы и цифры'),
  name: yup.string()
    .required('Обязательное поле')
    .max(50, "Максимальная длина 50 символов")
    .matches(/^\p{L}+$/u, 'Допустимы только буквы'),
  surname: yup.string()
    .required('Обязательное поле')
    .max(50, "Максимальная длина 50 символов")
    .matches(/^\p{L}+$/u, 'Допустимы только буквы'),
  sex: yup.string()
    .required('Обязательное поле')
});

const Step2ValidationSchema = yup.object({
  advantages: yup.array().of(
    yup.string().required('Обязательное поле').matches(/^\p{L}+$/u, 'Допустимы только буквы')
  ),
})

const Step3ValidationSchema = yup.object({
  'field-about': yup.string().max(200, 'Максимальная длина 200 символов')
});

interface Step1Props {
  next: (data: Partial<FormData>, final?: boolean) => void;
  data: FormData;
}
interface Step2Props {
  next: (data: Partial<FormData>, final?: boolean) => void;
  prev: (data: Partial<FormData>) => void;
  data: FormData;
}
interface Step3Props {
  next: (data: Partial<FormData>, final?: boolean) => void;
  prev: (data: Partial<FormData>) => void;
  data: FormData;
  submitted: boolean;
  successModal: boolean;
}

const Step1: React.FC<Step1Props> = ({ next, data }) => {
  const navigate = useNavigate();
  const handleSubmit = (values: Partial<FormData>) => {
    next(values);
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={Step1ValidationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div className={styles.fieldContainer}>
            <label className={styles.label} htmlFor='nickname'>Никнейм</label>
            <Field className={styles.field} name='nickname' id='field-nickname'/>
            <ErrorMessage name="nickname" component={Form} className={styles.error} />
          </div>

          <div className={styles.fieldContainer}>
            <label className={styles.label} htmlFor='name'>Имя</label>
            <Field className={styles.field} id='field-name' name='name' />
            <ErrorMessage name="name" component={Form} className={styles.error} />
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.label} htmlFor='surname'>Фамилия</label>
            <Field className={styles.field} id='field-surname' name='surname' />
            <ErrorMessage name="surname" component={Form} className={styles.error} />
          </div>
          <div className={styles.fieldContainer}>
            <label className={styles.label} htmlFor='sex'>Пол</label>
            <Field className={styles.field} as='select' id='field-sex' name='sex'>
              <option className={styles.option} id='field-option-man' value="man">Мужской</option>
              <option className={styles.option} id='field-option-woman' value="woman">Женский</option>
            </Field>
            <ErrorMessage name="sex" component={Form} className={styles.error} />
          </div>
          <div className={styles.buttons}>
            <button className={styles.back} type="button" id='button-back' onClick={() => navigate('..')}>Назад</button>
            <button className={styles.forward} type="submit" id='button-next'>Далее</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const CheckboxGroup: React.FC<{ options: { label: string; value: string }[]; name: string }> = ({ options, name }) => (
  <>
    {options.map(option => (
      <label className={styles.label} key={option.value}>
        <Field type="checkbox" id={`field-checkbox-group-option-${option.value}`} name={name} value={option.value} />
        {option.label}
      </label>
    ))}
  </>
);

const RadioGroup: React.FC<{ options: { value: string; label: string }[]; name: string }> = ({ options, name }) => (
  <>
    {options.map(option => (
      <label className={styles.label} key={option.value}>
        <Field type="radio" id={`field-radio-group-option-${option.value}`} name={name} value={option.value} />
        {option.label}
      </label>
    ))}
  </>
);

const Step2: React.FC<Step2Props> = ({ next, prev, data }) => {
  const handleSubmit = (values: Partial<FormData>) => {
    next(values);
  };

  const checkboxOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
  ];

  const radioOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
  ];

  return (
    <Formik
      initialValues={data}
      validationSchema={Step2ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form>
          <p className={styles.label}>Преимущества</p>
          <FieldArray name="advantages">
            {({ push, remove }) => (
              <div>
                {values.advantages.map((_advantage, index) => (
                  <>
                  <div className={styles.advantagesLine} key={index}>
                    <Field className={styles.field} id={`field-advantages-${index}`} name={`advantages[${index}]`} placeholder='Placeholder' />
                    <button className={styles.deleteButton} type="button" id={`button-remove-${index}`} onClick={() => remove(index)}>
                      <img src={trash} alt="" />
                    </button>
                  </div>
                  <ErrorMessage name={`advantages[${index}]`} component="div" className={styles.error} />
                  </>
                ))}
                <button className={styles.addButton} type="button" id='button-add' onClick={() => push('')}>
                  <img src={add} alt="Add" /> 
                </button>
              </div>
            )}
          </FieldArray>

          <p className={styles.group}>Checkbox группа</p>
          <CheckboxGroup options={checkboxOptions} name="checkbox"></CheckboxGroup>
          <p className={styles.group}>Radio группа</p>
          <RadioGroup options={radioOptions} name="radio"></RadioGroup>
          <div className={styles.buttons}>
            <button className={styles.back} type="button" id='button-back' onClick={() => prev(values)}>Назад</button>
            <button className={styles.forward} type="submit" id='button-next'>Далее</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Step3: React.FC<Step3Props> = ({ next, prev, data }) => {
  const navigate = useNavigate();
  const handleSubmit = (values: Partial<FormData>) => {
    next(values, true);
  };

  const symbolCount = (words: string): number => {
    if (words) return words.replace(/\s/g, "").length;
    return 0;
  };

  return (
    <>
    <Formik
      initialValues={data}
      validationSchema={Step3ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <label className={styles.label} htmlFor='field-about'>О себе</label>
          <Field className={styles.textarea} id='field-about' name='field-about' as='textarea' placeholder='Placeholder' />
          <div className={styles.underTextarea}>
            
          <div className={styles.counter}>
            {symbolCount(values['field-about'])} / 200
          </div>
          <ErrorMessage name="field-about" component={Form} className={styles.error} />
          </div>
          <div className={styles.buttons}>
            <button className={styles.back} type="button" id='button-back' onClick={() => prev(values)}>Назад</button>
            <button className={styles.forward} type="submit" id='button-send' disabled={isSubmitting}>Отправить</button>
          </div>
        </Form>
      )}
    </Formik>
    {/* {submitted && <Modal onClose={()=>{navigate('/')}}/>} */}
    successModal ? 
    </>
  );
};

export default FormPage;

