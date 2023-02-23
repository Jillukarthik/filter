import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import "./App.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Switch from "@mui/material/Switch";
import DownloadingIcon from "@mui/icons-material/Downloading";
import IosShareIcon from "@mui/icons-material/IosShare";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function App() {
  const [datafetch, setDatafetch] = useState([]);
  const [popup, setpopup] = useState(false);
  const [inputData, setinputData] = useState([]);
  const [operator, setOperator] = useState("");
  const [filterData, setfilterData] = useState([]);
  const [dataShow, setDatashow] = useState(true);
  const {
    register,
    control,
    formState: { isValid },
    getValues,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      test: [{ data: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });
  const onSubmit = (data) => {
    console.log(data);
    let cleanData = data.test.map((x) => x.data);
    setinputData(cleanData);
    setOperator(data.operator);
    handlefilter();
    setDatashow(false);
  };

  const handlefilter = () => {
    if (operator == "OR") {
      // console.log("or");
      let output = [];
      datafetch.forEach((x) => {
        inputData.forEach((item) => {
          // console.log(item, "ïtem");
          if (x.name.includes(item)) {
            output.push(x);
          }
        });
      });

      setfilterData(output);
    } else {
      console.log("AND");
      let output = [];

      datafetch.forEach((x, index) => {
        let i = 0;
        inputData.forEach((item, index, arr) => {
          if (x.name.includes(item)) {
            i = 0;
          } else {
            i = 1;
          }
        });

        if (i == 0) {
          output.push(x);
        }
      });
      setfilterData(output);
    }
  };

  const toggleAdvanceSwitch = () => {
    if (fields.length === 1) {
      append();
    } else if (fields.length >= 2) {
      remove([1, 2, 3, 4, 5]);
    }
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((x) => {
      setDatafetch(x.data);
    });
  }, []);

  //filter popup
  const handleToggle = () => {
    setpopup(true);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  // const operatorOption = [
  //   { value: "and", operator: "And" },
  //   { value: "or", operator: "Or" },
  // ];
  return (
    <div className="filter">
      <div className="filter__header">
        <div className="filter__highlights">
          <h3 className="hightlights__topic">Highlights</h3>
        </div>
        <div className="filter__icons">
          <span>
            <FilterListIcon style={{ marginTop: "5px" }} />
          </span>
          <span className="filter__toggle" onClick={(e) => handleToggle(e)}>
            Filter
          </span>
          <span>
            <ArrowDropDownIcon style={{ marginLeft: "10px" }} />
          </span>
        </div>
      </div>
      <div className="filter__border">
        {dataShow
          ? datafetch.map((x, index) => (
              <>
                <div className="filter__data" key={x.id}>
                  <img
                    src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                    className="filter__dataimage"
                    alt="imagealt"
                  />
                  <div>
                    <span className="filterdata__playtime">
                      <small className="filterdata__playtimedata">
                        00:0{index}
                      </small>
                    </span>
                    <span className="filterdata__name">Login test</span>
                  </div>
                  <p style={{ marginLeft: "12px" }}>name:{x.name}</p>
                  
                  <div className="filterdata__footer">
                    <div
                      style={{
                        height: "22px",
                        width: "15px",
                        backgroundColor: "pink",
                        borderRadius: "3px",
                      }}
                    ></div>
                    <div className="filterdata__footericons">
                      <span>
                        <DownloadingIcon
                          style={{
                            position: "relative",
                            left: "-63px",
                            fontSize: "larger",
                            color: "purple",
                          }}
                        />
                      </span>
                      <span>
                        {" "}
                        <IosShareIcon
                          style={{
                            position: "relative",
                            left: "-35px",
                            fontSize: "larger",
                          }}
                        />
                      </span>
                      <span
                        style={{
                          position: "relative",
                          left: "-6px",
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #CCC",
                          height: "22px",
                          borderRadius: "4px",
                          backgroundColor: "white",
                          width: "34px",
                          textAlign: "center",
                          paddingLeft: "12px",
                        }}
                      >
                        {" "}
                        <ChatBubbleOutlineIcon fontSize="larger" />
                        <span style={{marginTop:"-3px",fontSize:"smaller",marginLeft:"2px"}}>{index + 1}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ))
          : filterData.map((x,index) => (
            <>
            <div className="filter__data" key={x.id}>
              <img
                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                className="filter__dataimage"
                alt="imagealt"
              />
              <div>
                <span className="filterdata__playtime">
                  <small className="filterdata__playtimedata">
                    00:0{index}
                  </small>
                </span>
                <span className="filterdata__name">Login test</span>
              </div>
              <p style={{ marginLeft: "12px" }}>name:{x.name}</p>
              
              <div className="filterdata__footer">
                <div
                  style={{
                    height: "22px",
                    width: "15px",
                    backgroundColor: "pink",
                    borderRadius: "3px",
                  }}
                ></div>
                <div className="filterdata__footericons">
                  <span>
                    <DownloadingIcon
                      style={{
                        position: "relative",
                        left: "-63px",
                        fontSize: "larger",
                        color: "purple",
                      }}
                    />
                  </span>
                  <span>
                    {" "}
                    <IosShareIcon
                      style={{
                        position: "relative",
                        left: "-35px",
                        fontSize: "larger",
                      }}
                    />
                  </span>
                  <span
                    style={{
                      position: "relative",
                      left: "-6px",
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #CCC",
                      height: "22px",
                      borderRadius: "4px",
                      backgroundColor: "white",
                      width: "34px",
                      textAlign: "center",
                      paddingLeft: "12px",
                    }}
                  >
                    {" "}
                    <ChatBubbleOutlineIcon fontSize="larger" />
                    <span style={{marginTop:"-3px",fontSize:"smaller",marginLeft:"2px"}}>{index + 1}</span>
                  </span>
                </div>
              </div>
            </div>
          </>
            ))}
      </div>
      <div>
        {popup && (
          <div className="popup__filter">
            <form onSubmit={handleSubmit(onSubmit)}>
              <ul>
                {fields.map((item, index) => {
                  return (
                    <li
                      key={index}
                      style={{ listStyle: "none", color: "#FFFFFF" }}
                    >
                      <div className="filter__inputdata">
                        <div>
                          {index !== 0 && (
                            <select
                              {...register("operator")}
                              className="filter__select"
                              style={{
                                marginLeft: index == 0 ? "12px" : "7px",
                              }}
                            >
                              <option
                                className="filter__selectoption"
                                value="AND"
                              >
                                And
                              </option>
                              <option
                                value="OR"
                                className="filter__selectoption"
                              >
                                Or
                              </option>
                            </select>
                          )}
                        </div>
                        <div>
                          <select
                            // style={{
                            //   appearance: "none",
                            //   borderRadius: "4px",
                            // }}
                            {...register("highlights")}
                            className="filter__highlightselect"
                          >
                            <option
                              className="filter__highlightselectoption"
                              value="Highlights"
                            >
                              Highlights
                            </option>
                            <option
                              className="filter__highlightselectoption"
                              value="Speaker"
                            >
                              Speaker
                            </option>
                            <option
                              className="filter__highlightselectoption"
                              value="Tag"
                            >
                              Tag
                            </option>
                          </select>
                        </div>
                        <div>
                          <input
                            className={
                              index == 0
                                ? "filter__input"
                                : "filter__inputafter"
                            }
                            {...register(`test.${index}.data`, {
                              required: {
                                value: true,
                                message: "required",
                              },
                            })}
                            placeholder="Enter highlights(min 1 character)"
                          />
                        </div>
                        <div className="filter__delete_icon">
                          {index !== 0 && (
                            <DeleteOutlineIcon onClick={() => remove(index)} />
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div></div>
              <section>
                <button
                  type="button"
                  className={
                    (fields.length === 1 && "buttonappend__none") ||
                    (fields.length === 5 && "buttonappend__none")
                  }
                  id="filter__add"
                  onClick={() => {
                    append();
                  }}
                >
                  +Add
                </button>
                <div className="filter__toggle__advance">
                  <div className="filter__toggle__switch">
                    <Switch
                      {...label}
                      onChange={toggleAdvanceSwitch}
                      style={{ color: "#6f73d2" }}
                    />
                    <span>Advanced </span>
                  </div>
                  <div>
                    <button
                      className="filter__clear"
                      type="reset"
                      onClick={() => {
                        setDatashow(true);
                        setpopup(false);
                        remove([1, 2, 3, 4, 5]);
                        setValue(`test.${0}.data`, "");
                      }}
                    >
                      Clear filter
                    </button>
                    <input
                      disabled={!isValid}
                      type="submit"
                      className={
                        !isValid ? "disabledfilter__apply" : "filter__apply"
                      }
                      value="Apply filter"
                    />
                  </div>
                </div>
              </section>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
