import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Notice from "../../../../../components/shared/Notice";
import ChanllengeApi from "../../../../../apis/chanllengeApi";
import LanguageApi from "../../../../../apis/languageApi";

import { useNavigate } from "react-router-dom";
import useStore from "../../../../../store/useStore";
import "./style.scss";
// Yup validateion schema
const schema = yup
  .object({
    name: yup
      .string()
      .min(6, "Name must be larger than 6 characters")
      .required("Please fill name"),
    hint: yup
      .string()
      .min(12, "Hint must be larger than 12 characters")
      .required("Please fill hint"),
    descriptions: yup
      .string()
      .min(20, "Descriptions must be larger than 20 characters")
      .required("Please fill descriptions"),
    difficult: yup.string().required(),
    type1: yup.string().required(),
    functionName: yup
      .string()
      .required("Funtion name of chanllenge is required"),
    type2: yup.string(),
    numberArgs: yup
      .number("Please fill a number")
      .min(1, "Number agruments least is 1")
      .max(2, "Number agruments largest is 2")
      .typeError("You must specify a number")
      .required("Please fill numbers arguments"),
    typeOutput: yup.string().required(),
    testcases: yup.string().required("Testcases is required"),
    py: yup.boolean(),
  })
  .required();

const defaultTestcase = `[
    {
      "input": ["213",[1,2,3]],
      "output": 3
    },
    {
      "input": ["abc"],
      "output": 3
    },
    {
      "input": ["abc"],
      "output": "3"
    }
  ]`;
function AddChanllenge() {
  const difficults = useStore((state) => state.difficults);
  // Declare initital variables
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [numberAgrs, setNumberAgrs] = useState("1");

  const [testcase, setTestcase] = useState(defaultTestcase);

  const [langs, setLangs] = useState(null);

  //Notice component control state
  const [dialog, setDialog] = useState({
    message: "",
    isOpen: false,
    isSuccess: false,
  });

  useEffect(() => {
    (async () => {
      let { langs } = await LanguageApi.getListLanguages();
      setLangs(langs);
    })();
  }, []);

  //handleNotice
  const handleNotice = (state) => setDialog({ ...dialog, isOpen: state });

  // Submit form
  const onSubmitForm = (data) => {
    const {
      py,
      descriptions,
      difficult,
      functionName,
      hint,
      name,
      numberArgs,
      testcases,
      type1,
      type2,
      typeOutput,
    } = data;
    //Validate testcases
    try {
      let jsonObj = JSON.parse(testcases);
      //Check structure
      if (!Array.isArray(jsonObj))
        throw new Error("Using array syntax to wrap object input output!");
      let testcaseGive = [...jsonObj];
      // Array includes input types
      let typeInput = [type1].filter((type) => type);
      if (numberArgs == 2) {
        typeInput = [type1, type2];
      }
      if (testcaseGive.length !== 3) {
        throw new Error("Testcase have three object input and output");
      }
      let checkTypeInput = testcaseGive.every((item) => {
        // Check number input
        if (item.input.length != numberAgrs) return false;
        //Check output type
        let isValidOutput =
          typeOutput == "array"
            ? Array.isArray(item.output)
            : typeof item.output == typeOutput;
        if (!isValidOutput) return false;
        //Check type
        let isvalidInput = item.input.every((input, index) => {
          if (typeInput[index] == "array") {
            return Array.isArray(input);
          } else {
            return typeof input == typeInput[index];
          }
        });
        if (!isvalidInput) return false;
        return true;
      });
      if (!checkTypeInput) {
        throw new Error("Input type or output type don't match!");
      }

      //Initial object chanllenge to create
      let stringVal = typeInput.length === 1 ? "arg1" : "arg1,arg2";
      let defaultCode = [];
      langs.forEach((lang) => {
        if (lang.name === "javascript") {
          defaultCode.push({
            lang: lang._id,
            code: `function ${functionName}(${stringVal}){\n $ \n}`,
          });
        } else if (py) {
          defaultCode.push({
            lang: lang._id,
            code: `import sys \ndef ${functionName}(${stringVal}):\n\t $ \n`,
          });
        }
      });
      //Array type of inputs
      let chanllenge = {
        numberArgs,
        defaultCode,
        typeInput,
        name,
        descriptions,
        hint,
        difficult,
        testcases: testcaseGive,
      };
      console.log(chanllenge);

      ChanllengeApi
      .createNewChanllenge(chanllenge)
      .then((data) => {
        setDialog({
          ...dialog,
          message: "Create new chanllenge success!",
          isSuccess: true,
          isOpen: true,
        });

      })
      .catch((err) => {
        // Not found account
        setDialog({
          ...dialog,
          message: err.response.data.error,
          isSuccess: false,
          isOpen: true,
        });
      });
    } catch (error) {
      setDialog({
        ...dialog,
        message: error.message
          ? error.message
          : `Testcase array invalid. It must be following by structure. [
        {
          input: [agrument1, agrument2],
          output : output
        },
        ...
      ]`,
        isSuccess: false,
        isOpen: true,
      });
    }
  };
  const handleAgrumentsChange = (e) => {
    let value = e.target.value;
    setNumberAgrs(value.trim());
  };
  const renderTypeAgruments = () => {
    let value = numberAgrs;
    if (!Number(value) || (value != "1" && value != "2")) {
      return "";
    }
    let length = parseInt(value);
    let res = [];

    for (let index = 0; index < length; index++) {
      let layout = (
        <label
          key={index}
          className="w-1/2 block text-grey-darker text-sm mb-1 mt-3"
        >
          <span className="block mb-1 text-black">Type {index + 1}</span>
          <select
            {...register(`type${index + 1}`)}
            className="w-full px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block rounded-md sm:text-sm focus:ring-1"
          >
            <option value={"string"}>String</option>
            <option value={"array"}>Array</option>
            <option value={"number"}>Number</option>
          </select>
          <p className="message text-red-600 font-semibold mt-1">
            {errors[`type${index + 1}`]?.message}
          </p>
        </label>
      );
      res.push(layout);
    }
    return res;
  };
  const handleChangeTestCase = (e) => {
    setTestcase(e.target.value);
  };
  return (
    <div className="w-full content pl-[24px] pt-[29px] pr-[24px] relative">
      <div className="path text-gray-600 font-bold text-lg mb-11">
        Chanlenge manager &gt;{" "}
        <span className="text-primary font-bold">Create new chanllenge</span>
      </div>
      <h2 className="text-primary text-2xl font-bold mb-4">
        Create new chanllenge
      </h2>
      <div className="relative w-full h-[70vh]">
        <form
          className="h-full overflow-y-scroll"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <div className="flex gap-x-3">
            <div className="w-1/2">
              <label className="block text-grey-darker text-sm mb-1 mt-3">
                <span className="block mb-1 text-black">Name</span>
                <input
                  {...register("name")}
                  className="w-full px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block rounded-md sm:text-sm focus:ring-1"
                  placeholder="Name of chanllenge"
                />
                <p className="message text-red-600 font-semibold mt-1">
                  {errors.name?.message}
                </p>
              </label>
              <label className="w-full block text-grey-darker text-sm mb-1 mt-3 ">
                <span className="block mb-1 text-black">Descriptions</span>
                <textarea
                  {...register("descriptions")}
                  rows={5}
                  className="text-sm resize-none w-full px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block rounded-md sm:text-sm focus:ring-1"
                  placeholder="Descriptions for chanllenge"
                />
                <p className="message text-red-600 font-semibold mt-1">
                  {errors.descriptions?.message}
                </p>
              </label>
            </div>
            <div className="w-1/2">
              <label className="w-full block text-grey-darker text-sm mb-1 mt-3 ">
                <span className="block mb-1 text-black">Hint</span>
                <textarea
                  {...register("hint")}
                  rows={5}
                  className="text-sm resize-none w-full px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block rounded-md sm:text-sm focus:ring-1"
                  placeholder="Hint for chanllenge"
                />
                <p className="message text-red-600 font-semibold mt-1">
                  {errors.hint?.message}
                </p>
              </label>
              <label className="block text-grey-darker text-sm mb-1 mt-3">
                <span className="block mb-1 text-black">Numbers Agruments</span>
                <input
                  {...register("numberArgs")}
                  className="w-full px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block rounded-md sm:text-sm focus:ring-1"
                  placeholder="Numbers arguments of chanllenge"
                  onChange={handleAgrumentsChange}
                  value={numberAgrs}
                />
                <p className="message text-red-600 font-semibold mt-1">
                  {errors.numberArgs?.message}
                </p>
              </label>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="w-1/2">
              <label className="block text-grey-darker text-sm mb-1 mt-3">
                <span className="block mb-1 text-black">Type agruments</span>
                <div className="flex gap-x-3">{renderTypeAgruments()}</div>
              </label>
            </div>
            <div className="w-1/2">
              <label className="w-full block text-grey-darker text-sm mb-1 mt-3">
                <span className="block mb-1 text-black">Difficult</span>
                {difficults && difficults.length > 0 && (
                  <select
                    defaultValue={difficults[0]._id}
                    {...register("difficult")}
                    className="w-full px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block rounded-md sm:text-sm focus:ring-1"
                  >
                    {difficults.map((diff, index) => (
                      <option key={index} value={diff._id}>
                        {diff.name}
                      </option>
                    ))}
                  </select>
                )}
                <p className="message text-red-600 font-semibold mt-1">
                  {errors.difficult?.message}
                </p>
              </label>
              <label className="block text-grey-darker text-sm mb-1 mt-3">
                <span className="block mb-1 text-black">Function name</span>
                <input
                  {...register("functionName")}
                  className="w-full px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block rounded-md sm:text-sm focus:ring-1"
                  placeholder="Name of function"
                  onKeyPress={(e) => {
                    if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                    } else e.preventDefault();
                  }}
                />
                <p className="message text-red-600 font-semibold mt-1">
                  {errors.functionName?.message}
                </p>
              </label>
            </div>
          </div>
          <div className="flex gap-x-3">
            <div className="w-1/2">
              <label className="block text-grey-darker text-sm mb-1 mt-3">
                <span className="block mb-1 text-black">
                  Testcases (3 testcases, following JSON writing)
                </span>
                <textarea
                  {...register("testcases")}
                  rows={10}
                  className="resize-none text-sm w-full px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block rounded-md sm:text-sm focus:ring-1"
                  placeholder="Write here"
                  value={testcase}
                  onChange={handleChangeTestCase}
                />
                <p className="message text-red-600 font-semibold mt-1">
                  {errors.testcases?.message}
                </p>
              </label>
            </div>
            <div className="w-1/2">
              <label className="w-full block text-grey-darker text-sm mb-1 mt-3">
                <span className="block mb-1 text-black">Type output</span>
                <select
                  {...register(`typeOutput`)}
                  className="w-full px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block rounded-md sm:text-sm focus:ring-1"
                >
                  <option value={"string"}>String</option>
                  <option value={"array"}>Array</option>
                  <option value={"number"}>Number</option>
                  <option value={"object"}>Object</option>
                  <option value={"boolean"}>Boolean</option>
                </select>
                <p className="message text-red-600 font-semibold mt-1">
                  {errors[`typeOutput`]?.message}
                </p>
              </label>
              <label className="w-full block text-grey-darker text-sm mb-1 mt-3">
                <span className="block mb-1 text-black">Languages support</span>
                <div className="flex gap-x-5">
                  <div className="">
                    <input
                      checked={true}
                      disabled
                      type="checkbox"
                      className=" bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block rounded-md sm:text-sm focus:ring-1"
                    ></input>
                    Javascript
                  </div>
                  <div className="">
                    <input
                      type="checkbox"
                      {...register(`py`)}
                      className=" bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-primary block rounded-md sm:text-sm focus:ring-1"
                    ></input>
                    Python
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="w-full relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-primary rounded-md group"
            >
              Create chanllenge
            </button>
          </div>
        </form>
      </div>
      <div
        className={`${
          dialog.isOpen ? "block" : " hidden"
        } absolute top-0 -left-[15%]`}
      >
        <Notice
          status={dialog.isOpen}
          message={dialog.message}
          handleNotice={handleNotice}
          typeNotice={dialog.isSuccess}
        />
      </div>
    </div>
  );
}

export default AddChanllenge;
