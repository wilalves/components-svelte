<script>
  import { Form, Input, Select, Choice } from 'sveltejs-forms';
  import Spinner from 'svelte-spinner';
  import Debugger from 'svelte-debugger';
  import * as yup from 'yup';

  let formValues;

  function handleReset() {
    console.log('form has been reset');
  }

  function handleSubmit({ detail: { values, setSubmitting, resetForm } }) {
    console.log(values);
    setTimeout(() => {
      formValues = values;
      setSubmitting(false);
      resetForm();
    }, 1000);
  }

  const schema = yup.object().shape({
    user: yup.object().shape({
      email: yup
        .string()
        .required()
        .email(),
      bio: yup.string().min(5),
      language: yup.string().required(),
      os: yup
        .array()
        .of(yup.string().required())
        .min(2),
    }),
  });

  const langOptions = [
    { id: 'svelte', title: 'Svelte' },
    { id: 'react', title: 'React' },
    { id: 'angular', title: 'Angular' },
  ];

  const osOptions = [
    { id: 'macos', title: 'macOS' },
    { id: 'linux', title: 'Linux 🐧' },
    { id: 'windows', title: 'Windows' },
  ];
</script>

<style>
  :global(.sveltejs-forms) {
    background-color: #f8f8f8;
    display: inline-block;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  :global(label) {
    font-size: 0.8rem;
    color: #888;
    margin-bottom: 0.2rem;
  }

  :global(.message) {
    font-size: 0.8rem;
    color: #888;
    margin: 0.2rem 0;
    color: #f56565;
  }

  :global(input[type='text']),
  :global(textarea),
  :global(select) {
    width: 100%;
    background-color: white;
    margin: 0;
  }

  :global(input[type='checkbox'] + label) {
    display: inline-block;
    margin-right: 2rem;
  }

  :global(.field) {
    margin-bottom: 1rem;
  }

  .buttons {
    margin-top: 0.8rem;
    display: flex;
    align-items: center;
  }
	
  button {
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    color: white;
  }

  button[type='reset'] {
    background-color: #f56565;
  }

  button[type='submit'] {
    background-color: #48bb78;
    width: 80px;
  }

  .debugger {
    margin-top: 1rem;
  }
</style>

<Form
  {schema}
  validateOnChange={true}
  validateOnBlur={true}
  on:submit={handleSubmit}
  on:reset={handleReset}
  let:isSubmitting>
  <Input
    name="user.email"
    label="Email Address"
    placeholder="e.g. user@example.com" />
	
  <Input name="user.bio" label="Bio" placeholder="About you" multiline />
	
  <Select
    name="user.language"
    label="Programming Language"
    options={langOptions} />
	
  <label>Operating Systems</label>
  <Choice name="user.os" options={osOptions} multiple />
	
  <div class="buttons">
    <button type="reset">Reset</button>
    <button type="submit" disabled={isSubmitting}>Submit</button>
    {#if isSubmitting}
      <Spinner />
    {/if}
  </div>
</Form>

<div class="debugger">
  Submitted form values:
  {#if formValues}
    <Debugger
      data={formValues}
      indent={2}
      colorOptions={{ falseColor: '#ff3e00', trueColor: '#40b3ff' }} />
  {/if}
</div>
