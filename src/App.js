import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [popup, setpopup] = useState(false);
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [{ data: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

  const onSubmit = (data) => console.log("data", data);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((x) => {
      setData(x.data);
      console.log(x.data);
    });
  }, []);

  //filter popup
  const handleToggle = () => {
    setpopup(true);
  };

  return (
    <div className="app">
      <div className="border">
        {data.map((x) => (
          <>
            <div className="data" key={x.id}>
              <p>postId{x.postId}</p>
              <p>email{x.email}</p>
            </div>
          </>
        ))}
      </div>
      <div onClick={(e) => handleToggle(e)}>
        <p className="app__filter">filter</p>
        {popup && (
          <div className="popup__filter">
            <form onSubmit={handleSubmit(onSubmit)}>
              <ul>
                {fields.map((item, index) => {
                  return (
                    <li key={item.id}>
                      <input
                        {...register(`test.${index}.data`, { required: true })}
                      />

                      <button type="button" onClick={() => remove(index)}>
                        Delete
                      </button>
                    </li>
                  );
                })}
              </ul>
              <section>
                <button
                  type="button"
                  onClick={() => {
                    append({ data: "appendBill" });
                  }}
                >
                  append
                </button>
              </section>

              <input type="submit" />
            </form>
            <button
              onClick={() => {
                setpopup(false);
              }}
            >
              clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
