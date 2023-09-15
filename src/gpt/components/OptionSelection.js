import { Button } from "primereact/button";
import React from "react";

export default function OptionSelection({ arrayItems, selectOption, selectedTitle}) {
  return (
    <>
      <h3 className="heading"> GPT</h3>

      <div className="grid-main">
        {arrayItems.map((item) => {
          return (
            <Button
              className="grid-child"
              style={{ backgroundColor: "#1039B8", opacity:"80%", border: "none" }}
              onClick={() => selectOption(item) && selectedTitle(item.name) && console.log(item.name) }
            >
              <div><h3>{item.name}</h3></div>
              <span>{item.description}</span>
            </Button>
          );
        })}
      </div>
    </>
  );
}
