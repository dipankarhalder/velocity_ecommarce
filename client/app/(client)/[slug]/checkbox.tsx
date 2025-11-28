"use client";

type Props = {
  title: string;
};

export const Checkbox = ({ title }: Props) => {
  const handleChange = (id: string) => {
    console.log("Hello form data", id);
  };

  return (
    <li>
      <label>
        <input type="checkbox" onChange={() => handleChange(title)} />
        <p>{title}</p>
      </label>
    </li>
  );
};
