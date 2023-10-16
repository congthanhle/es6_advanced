import { data } from "./contents-structure.js";
import fs from "fs";

const result = data.reduce((acc, item) => {
  const { topic, lesson, cando, step, progress_type, ...content } = item;

  if (!acc[topic]) {
    acc[topic] = [];
  }
/* 
  "1":[

  ]
*/
  let topicObj = acc[topic].find((topicItem) => topicItem.id === topic);
  if (!topicObj) {
    topicObj = {
      id: topic,
      lesson: [],
    };
    acc[topic].push(topicObj);
  }
/*
   "1":[
      "id": 1,
      "lesson": []
   ]
*/
  let lessonObj = topicObj.lesson.find((lessonItem) => lessonItem.id === lesson);
  if (!lessonObj) {
    lessonObj = {
      id: lesson,
      cando: [],
    };
    topicObj.lesson.push(lessonObj);
  }
/*
   "1":[
    {
      "id": 1,
      "lesson": [
        {
          "id": 1,
          "cando": []
        }
      ]
    } 
   ]
*/
  let candoObj = lessonObj.cando.find((candoItem) => candoItem.id === cando);
  if (!candoObj) {
    candoObj = {
      id: cando,
      step: [],
    };
    lessonObj.cando.push(candoObj);
  }
/*
   "1":[
    {
      "id": 1,
      "lesson": [
        {
          "id": 1,
          "cando": [
            {
              "id": 1,
              "step": [

              ]
            }
          ]
        }
      ]
    } 
   ]
*/
  let stepObj = candoObj.step.find((stepItem) => stepItem.id === step);
  if (!stepObj) {
    stepObj = {
      id: step,
      typeStart: [],
      typeEnd: [],
      typeNormal: [],
    };
    candoObj.step.push(stepObj);
  }
/*
   "1":[
    {
      "id": 1,
      "lesson": [
        {
          "id": 1,
          "cando": [
            {
              "id": 1,
              "step": [
                "id": 1,
                "typeStart": [],
                "typeEnd": [],
                "typeNormal": []
              ]
            }
          ]
        }
      ]
    } 
   ]
*/
  switch (progress_type) {
    case "lesson_start":
      stepObj.typeStart.push({ content });
      break;
    case "lesson_end":
      stepObj.typeEnd.push({ content });
      break;
    default:
      stepObj.typeNormal.push({ content });
      break;
  }
/*
   "1":[
    {
      "id": 1,
      "lesson": [
        {
          "id": 1,
          "cando": [
            {
              "id": 1,
              "step": [
                "id": 1,
                "typeStart": [ content],
                "typeEnd": [],
                "typeNormal": [content]
              ]
            }
          ]
        }
      ]
    } 
   ]
*/
  return acc;
}, {});

const jsonResult = JSON.stringify(result, null, 2);

const outputFileName = "output.json";

fs.writeFileSync(outputFileName, jsonResult, "utf-8");

console.log(`Kết quả đã được ghi vào tập tin: ${outputFileName}`);
