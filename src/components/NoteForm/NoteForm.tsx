import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { createNote } from "../../services/noteService";

interface NoteFromProp {
  onClose: () => void;
}

interface InitialValuesType {
  title: string;
  content: string;
  tag: "Todo" | "Personal" | "Work" | "Meeting" | "Shopping";
}

const initialValues: InitialValuesType = {
  title: "",
  content: "",
  tag: "Todo",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required field").min(3).max(50),
  content: Yup.string().max(500),
  tag: Yup.string()
    .required("Tag is required")
    .oneOf(["Todo", "Personal", "Work", "Meeting", "Shopping"], "Invalid tag"),
});

const NoteForm = ({ onClose }: NoteFromProp) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleSubmit = (
    values: InitialValuesType,
    actions: FormikHelpers<InitialValuesType>
  ) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
        actions.resetForm();
      },
    });
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
