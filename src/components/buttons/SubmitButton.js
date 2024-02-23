import { useFormStatus } from 'react-dom';

export default function SubmitButton({ children, className = '' }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={
        'bg-mainColor disabled:bg-secundaryColor text-white disabled:text-gray-200 py-2 px-4 block mx-auto w-full flex gap-2 items-center justify-center ' +
        className
      }
    >
      {pending && <span>Salvando...</span>}
      {!pending && children}
    </button>
  );
}
