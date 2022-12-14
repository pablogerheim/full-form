import React from 'react';
import { useState } from "react";
import { BsX } from "react-icons/bs";
import "../css/Form.css";
import { dataSkill, dataExperiency } from "../data/data";
import DialogSkill from "../componentes/DialogSkill";
import DialogExperiency from "../componentes/DialogExperiency";

function Form() {
  const [skills, setSkills] = useState(dataSkill);
  const [experiency, setExperiency] = useState(dataExperiency);
  const [able, satAble] = useState(true)

  function addAbility(ability, age) {
    setSkills([...skills, { skill: ability, year: age }]);
  }

  function exclude(skill) {
    let helper = skills.filter(s => s.skill !== skill)
    setSkills(helper)
  }

  function handleEperiency() {
    if (!experiency) { return }
    return experiency.map((ex, i) => (
      <div key={`${i} n° of key`} className=" border-solid border-l-2 border-green-200 h-[130px] ">
        <p className=" relative top-[-14px] left-[-4px] text-green-900">•</p>
        <div className=" ml-3 relative top-[-28px] ">
          <p className="font text-lg">{ex.company}</p>
          <p className="opacity-75">
            {ex.job} • {ex.from} - {ex.to}
          </p>
          <p className="mt-5 opacity-80"> Skills used</p>
          <div className="flex ">
            {ex.skill.map((s, i) => (
              <p
                className="text-xs px-2 py-1 m-1 rounded-2xl bg-blue-200"
                key={i + s}
              >
                {s}
              </p>
            ))}
          </div>
        </div>
      </div>
    ));
  }

  function handleSkills() {
    if (!skills) { return }
    return skills.map((s, i) => (
      <p key={i + "skill"} className="flex min-w-[180px] items-center justify-evenly bg-[#D9D9D9] py-1 mt-2 rounded-2xl">
        {s.skill} - {s.year}
        <button onClick={() => exclude(s.skill)}>
          <BsX />
        </button>
      </p>
    ));
  }

  return (
    <>
      <header className={`stripe flex flex-col justify-center w-full ${able || "logooff"}`}>
        <h1 className="textFrom pl-[35px] text-[32px] font-[500]">Full Form</h1>
      </header>
      <main className={`screen ${able || "screenoff"}`}>
        <section>
          <div className="divSubTitle flex justify-between ">
            <h2 className="textSubTitle ">My Skills</h2>
            <DialogSkill
              addAbility={addAbility}
              satAble={satAble}
            />
          </div>
          <div className="flex flex-wrap gap-4">{handleSkills()}</div>
        </section>
        <section>
          <div className="divSubTitle mt-10 flex justify-between ">
            <h2 className="textSubTitle ">My Experiency</h2>
          </div>
          <div className="flex flex-row-reverse">
            <DialogExperiency
              experiency={experiency}
              setExperiency={setExperiency}
              satAble={satAble}
            />
          </div>
          <div>{handleEperiency()}</div>
        </section>
      </main>
    </>
  );
}

export { Form };
