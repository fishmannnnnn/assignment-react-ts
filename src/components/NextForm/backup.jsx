import styles from './FormPage.module.css'
import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import current from '../../assets/dot-current.svg';
import grey from '../../assets/dot-grey.svg';
import success from '../../assets/dot-success.svg';
import add from '../../assets/add.svg'
import trash from '../../assets/trash.svg'

const FormPage = () => {
  const [data, setData] = useState({
    nickname: "",
    name: "",
    surname: "",
    sex: "",
    advantages: ['', '', ''],
    checkbox: [],
    radio: 0,
    about: ""
  })

  const makeRequest = (formData) => {
    console.log('submitted', formData);
    
  }
  const [step, setStep] = useState(2);

  const handleNextStep = (newData, final = false) => {
    setData(prev => ({...prev, ...newData}))
    if(final){
      makeRequest(newData)
      return
    }
    setStep(prev => prev+1)
  }
  const handlePrevStep = (newData) => {
    setData(prev => ({...prev, ...newData}))
    setStep(prev => prev-1)
  }

  const steps = [
    <Step1 next={handleNextStep} data={data}/>, 
    <Step2 prev={handlePrevStep} next={handleNextStep} data={data}/>, 
    <Step3 prev={handlePrevStep} next={handleNextStep} data={data}/>
  ];
  console.log("data: ", data);
  
  return (
    <div className={styles.boxContainer}>
        <div className={styles.stepper}>
          <div className={styles.lines}>
            <div className={ step > 0 ? styles.lineActive : styles.line }></div>
            <div className={ step > 1 ? styles.lineActive : styles.line }></div>
          </div>
          <div className={styles.dots}>
            <img className={styles.dot} src={step === 0 ? current : success}  />
            <img className={styles.dot} src={step < 1 ? grey : step === 1 ? current : success}/>
            <img className={styles.dot} src={step < 2 ? grey : current}/>
          </div>
        </div>
        <div className={styles.container}>
          {steps[step]}
        </div>
    </div>
  )
}

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
})

const Step3ValidationSchema = yup.object({
  'field-about': yup.string().max(200, 'Максимальная длина 200 символов')
})

const Step1 = (props) => {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    props.next(values)
  }
  return (
    <Formik initialValues={props.data} 
      validationSchema={Step1ValidationSchema}
      onSubmit={handleSubmit}>
        {({values})=>(
          <Form>
            <div className={styles.fieldContainer}>
              <label className={styles.label} htmlFor='nickname'>Никнейм</label>
              <Field className={styles.field} id='nickname' name='nickname'/>
              <ErrorMessage name="nickname" component={Form} className={styles.error} />
            </div>
            
            <div className={styles.fieldContainer}>
              <label className={styles.label} htmlFor='name'>Имя</label>
              <Field className={styles.field} id='name' name='name'/>
              <ErrorMessage name="name" component={Form} className={styles.error} />
            </div>
            <div className={styles.fieldContainer}>
              <label className={styles.label} htmlFor='surname'>Фамилия</label>
              <Field className={styles.field} id='surname' name='surname'/>
              <ErrorMessage name="surname" component={Form} className={styles.error} />
            </div>
            <div className={styles.fieldContainer}>
              <label className={styles.label} htmlFor='sex'>Пол</label>
              <Field className={styles.field} as='select' id='sex' name='sex'>
                <option className={styles.option} value="">Не выбрано</option>
                <option className={styles.option} value="man">Мужской</option>
                <option className={styles.option} value="woman">Женский</option>
              </Field>
              <ErrorMessage name="sex" component={Form} className={styles.error} />
            </div>
            <div className={styles.buttons}>
              <button className={styles.back} type="button" onClick={()=>navigate('..')}>Назад</button>
              <button className={styles.forward} type="submit">Далее</button>
            </div>
          </Form>

  )}
    </Formik>
  );
}

const CheckboxGroup = ({ options, ...props }) => (
  <>
    {options.map(option => (
      <label className={styles.label} key={option.value}>
        <Field type="checkbox" name={props.name} value={option.value} />
        {option.label}
      </label>
    ))}
  </>
);
const RadioGroup = ({ options, ...props }) => (
  <>
    {options.map(option => (
      <label className={styles.label} key={option.value}>
        <Field type="radio" name={props.name} value={option.value} />
        {option.label}
      </label>
    ))}
  </>
);
const Step2 = (props) => {
  const handleSubmit = (values) => {
    props.next(values)
  }
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
    <Formik initialValues={props.data} 
      onSubmit={handleSubmit}>
        {({values})=>(
          <Form>
            <FieldArray name="advantages">
          {({ push, remove }) => (
            <div>
              {values.advantages.map((advantage, index) => (
                <div className={styles.advantagesLine} key={index}>
                  <Field className={styles.field} name={`advantages[${index}]`} placeholder='Placeholder'/>
                  <button className={styles.deleteButton} type="button" onClick={() => remove(index)}>
                    <img src={trash} alt="" />
                  </button>
                  <ErrorMessage name={`advantages[${index}]`} component="div" className="error" />
                </div>
              ))}
              <button className={styles.addButton} type="button" onClick={() => push('')}>
                <img src={add}/>
              </button>
            </div>
          )}
          </FieldArray>
          <p className={styles.label}>Checkbox группа</p>
          <CheckboxGroup options={checkboxOptions} name="checkbox"></CheckboxGroup>
          <p className={styles.label}>Radio группа</p>
          <RadioGroup options={radioOptions} name="radio"></RadioGroup>
          <div className={styles.buttons}>
            <button className={styles.back} type="button" onClick={() => props.prev(values)}>Назад</button>
            <button className={styles.forward} type="submit">Далее</button>
          </div>
          </Form>
        )}
    </Formik>
  );
}
const Step3 = (props) => {
  const handleSubmit = (values) => {
    props.next(values, true)
  }
  const symbolCount = (words) => {
    if (words) return words.replace(/\s/g, "").length;
    return 0;
  }
  return (
    <Formik initialValues={props.data}
      validationSchema={Step3ValidationSchema} 
      onSubmit={handleSubmit}>
        {({values, isSubmitting})=>(
          <Form>
            <label className={styles.label} htmlFor='field-about'>О себе</label>
            <Field className={styles.textarea} id='field-about' name='field-about' as='textarea' placeholder='Placeholder'/>
            <span className={styles.counter}>{symbolCount(values['field-about'])} / 200</span>
            <ErrorMessage name="field-about" component={Form} className={styles.error} />
            <div className={styles.buttons}>
              <button className={styles.back} type="button" onClick={() => props.prev(values)}>Назад</button>
              <button className={styles.forward} type="submit" disabled={isSubmitting}>Отправить</button>
            </div>
          </Form>
        )}
    </Formik>
  );
}

export default FormPage