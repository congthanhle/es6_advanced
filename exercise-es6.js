import { data } from "./contents-structure.js";
import fs from "fs";

const result = data.reduce((acc, item) => {
  const { topic, lesson, cando, step, progress_type, ...content } = item;

  if (!acc[topic]) {
    acc[topic] = [];
  }

  let topicObj = acc[topic].find((topicItem) => topicItem.id === topic);
  if (!topicObj) {
    topicObj = {
      id: topic,
      lesson: [],
    };
    acc[topic] = [...acc[topic], topicObj];
  }

  let lessonObj = topicObj.lesson.find(
    (lessonItem) => lessonItem.id === lesson
  );
  if (!lessonObj) {
    lessonObj = {
      id: lesson,
      cando: [],
    };
    topicObj.lesson = [...topicObj.lesson, lessonObj];
  }

  let candoObj = lessonObj.cando.find((candoItem) => candoItem.id === cando);
  if (!candoObj) {
    candoObj = {
      id: cando,
      step: [],
    };
    lessonObj.cando = [...lessonObj.cando, candoObj];
  }

  let stepObj = candoObj.step.find((stepItem) => stepItem.id === step);
  if (!stepObj) {
    stepObj = {
      id: step,
      typeStart: [],
      typeEnd: [],
      typeNormal: [],
    };
    candoObj.step = [...candoObj.step, stepObj];
  }

  switch (progress_type) {
    case "lesson_start":
      stepObj.typeStart = [...stepObj.typeStart, {content}]
      break;
    case "lesson_end":
      stepObj.typeEnd = [...stepObj.typeEnd, {content}]
      break;
    default:
      stepObj.typeNormal = [...stepObj.typeNormal, {content}]
      break;
  }

  return acc;
}, {});

const jsonResult = JSON.stringify(result, null, 2);

const outputFileName = "output.json";

fs.writeFileSync(outputFileName, jsonResult, "utf-8");

console.log(`Kết quả đã được ghi vào tập tin: ${outputFileName}`);
