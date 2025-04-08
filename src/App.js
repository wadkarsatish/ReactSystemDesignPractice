import { useEffect, useState } from "react";
import "./styles.css";

const treeData = [
  {
    id: "item_1",
    name: "item1",
    children: [
      {
        id: "item_2",
        name: "item11",
        children: [
          {
            id: "item_3",
            name: "item111",
            children: [
              {
                id: "item_4",
                name: "item1111",
                children: [
                  {
                    id: "item_5",
                    name: "item11111",
                    children: [],
                  },
                  {
                    id: "item_6",
                    name: "item11112",
                    children: [],
                  },
                ],
              },
              {
                id: "item_7",
                name: "item1112",
                children: [
                  {
                    id: "item_8",
                    name: "item11121",
                    children: [],
                  },
                  {
                    id: "item_9",
                    name: "item11122",
                    children: [],
                  },
                ],
              },
              {
                id: "item_10",
                name: "item1113",
                children: [
                  {
                    id: "item_11",
                    name: "item11131",
                    children: [],
                  },
                ],
              },
              {
                id: "item_12",
                name: "item11141",
                children: [],
              },
            ],
          },
          {
            id: "item_13",
            name: "item112",
            children: [
              {
                id: "item_14",
                name: "item11121",
                children: [],
              },
              {
                id: "item_15",
                name: "item11122",
                children: [],
              },
            ],
          },
          {
            id: "item_16",
            name: "item113",
            children: [],
          },
          {
            id: "item_17",
            name: "item114",
            children: [],
          },
        ],
      },
      {
        id: "item_18",
        name: "item12",
        children: [
          {
            id: "item_19",
            name: "item11121",
            children: [],
          },
          {
            id: "item_20",
            name: "item11122",
            children: [
              {
                id: "item_21",
                name: "item11121",
                children: [],
              },
              {
                id: "item_22",
                name: "item11122",
                children: [
                  {
                    id: "item_23",
                    name: "item11121",
                    children: [],
                  },
                  {
                    id: "item_24",
                    name: "item11122",
                    children: [
                      {
                        id: "item_25",
                        name: "item11121",
                        children: [],
                      },
                      {
                        id: "item_26",
                        name: "item11122",
                        children: [
                          {
                            id: "item_27",
                            name: "item11121",
                            children: [],
                          },
                          {
                            id: "item_28",
                            name: "item11122",
                            children: [
                              {
                                id: "item_29",
                                name: "item11121",
                                children: [],
                              },
                              {
                                id: "item_30",
                                name: "item11122",
                                children: [
                                  {
                                    id: "item_31",
                                    name: "item11121",
                                    children: [],
                                  },
                                  {
                                    id: "item_32",
                                    name: "item11122",
                                    children: [
                                      {
                                        id: "item_33",
                                        name: "item11121",
                                        children: [
                                          {
                                            id: "item_34",
                                            name: "item11121",
                                            children: [],
                                          },
                                          {
                                            id: "item_35",
                                            name: "item11122",
                                            children: [],
                                          },
                                        ],
                                      },
                                      {
                                        id: "item_36",
                                        name: "item11122",
                                        children: [
                                          {
                                            id: "item_37",
                                            name: "item11121",
                                            children: [
                                              {
                                                id: "item_38",
                                                name: "item11121",
                                                children: [],
                                              },
                                              {
                                                id: "item_39",
                                                name: "item11122",
                                                children: [],
                                              },
                                            ],
                                          },
                                          {
                                            id: "item_40",
                                            name: "item11122",
                                            children: [
                                              {
                                                id: "item_41",
                                                name: "item11121",
                                                children: [],
                                              },
                                              {
                                                id: "item_42",
                                                name: "item11122",
                                                children: [
                                                  {
                                                    id: "item_43",
                                                    name: "item11121",
                                                    children: [],
                                                  },
                                                  {
                                                    id: "item_44",
                                                    name: "item11122",
                                                    children: [],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "item_45",
        name: "item13",
        children: [],
      },
      {
        id: "item_46",
        name: "item14",
        children: [],
      },
    ],
  },
];

const CheckboxTree = ({ data, checked, setChecked }) => {
  const handleChange = (value, node) => {
    setChecked((prev) => {
      let newState = { ...prev, [node?.id]: value };

      const updateChildren = (node) => {
        node?.children?.forEach((item) => {
          newState[item.id] = value;
          item?.children.length && updateChildren(item);
        });
      };

      // mark the child status
      updateChildren(node);

      // update the status of parent

      const updateParentStatus = (child) => {
        if (!child?.children.length) return newState[child?.id] || false;

        let isAllNodesSelected = true;
        child?.children?.forEach((a) => {
          const returnVal = updateParentStatus(a);
          isAllNodesSelected = isAllNodesSelected && returnVal;
        });

        // console.log(child.id, isAllNodesSelected);
        newState[child.id] = isAllNodesSelected;
        return isAllNodesSelected;
      };

      treeData.forEach((item) => updateParentStatus(item));

      return newState;
    });
  };

  const renderCheckbox = (node) => {
    return (
      <div>
        <input
          type="checkbox"
          className="checkbox-input"
          id={node?.id}
          name={node?.id}
          checked={checked[node?.id] || false}
          onChange={(e) => handleChange(e?.target?.checked, node)}
        />
        <label className="checkbox-label" htmlFor={node?.id}>
          {node?.id}
        </label>
      </div>
    );
  };

  return data?.map((node) => (
    <div className="checkbox-container" key={node?.id}>
      {renderCheckbox(node)}
      {node?.children && (
        <CheckboxTree
          data={node?.children}
          checked={checked}
          setChecked={setChecked}
        />
      )}
    </div>
  ));
};

export default function App() {
  const [checked, setChecked] = useState({});

  return (
    <div className="App">
      <CheckboxTree data={treeData} checked={checked} setChecked={setChecked} />
    </div>
  );
}
