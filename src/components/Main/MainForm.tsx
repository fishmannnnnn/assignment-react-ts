import styles from "./MainForm.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import InputMask from 'react-input-mask';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setInitialValues } from '../../redux/slice';

interface FormValues {
    number: string;
    email: string;
}

const validationSchema = yup.object({
    number: yup.string()
        .required('Обязательное поле')
        .matches(/^\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/, 'Некорректный номер телефона'),
    email: yup.string()
        .required('Обязательное поле')
        .email('Некорректный email адрес')
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, 'Некорректный email адрес')
});

const MainForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <Formik 
            validationSchema={validationSchema}
            initialValues={{
                number: '',
                email: ''
            }} 
            onSubmit={(values: FormValues) => {
                console.log(values);
                dispatch(setInitialValues(values));
                navigate('/form');
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <div className={styles.label}>
                        <label className={styles.labelNumber} htmlFor="number">Номер телефона</label>
                        <Field name="number" onChange={()=>{
                            
                        }}>
                            {({ field, form }: { field: any, form: any }) => (
                                <div>
                                    <InputMask 
                                        className={styles.field}
                                        {...field}
                                        mask="+7 (999) 999-99-99"
                                        placeholder="+7 (999) 999-99-99"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            field.onChange(e);
                                            form.setFieldTouched(field.name, true, false);
                                        }}
                                    />
                                </div>
                            )}
                        </Field>
                        {errors.number && touched.number && (
                            <div className={styles.error}>{errors.number}</div>
                        )}
                    </div>
                    <div className={styles.label}>
                        <label className={styles.labelEmail} htmlFor="email">Email</label>
                        <Field 
                            className={styles.field} 
                            name="email" 
                            placeholder="webstudio.fractal@example.com"
                        />
                        {errors.email && touched.email && (
                            <div className={styles.error}>{errors.email}</div>
                        )}
                    </div>
                    <button className={styles.button} id='button-start' type='submit'>Начать</button>
                </Form>
            )}
        </Formik>
    );
};

export default MainForm;
