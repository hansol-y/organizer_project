import * as tf from '@tensorflow/tfjs';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

const classifier = knnClassifier.create();

/*
 * CLASSES to classify
 * Positive -> Positive: 0
 * Postivie -> Negative: 1
 * Negative -> Negative: 2
 * Negative -> Positive: 3
 * 
 * When GIVEN INPUT does not match the starting mood of the class, return ERROR (No valid prediction possible. We need more data!)
 */
export const predictNextMood = async(records) => {
    classifier.clearAllClasses();

    for (let i = 1; i < records.length - 1; i++) {
        let predictionClass;
        let prev = records[i-1];
        let curr = records[i];
        if (prev.mood === "happy" || prev.mood === "calm" || prev.mood === "energetic") {
            if (curr.mood  === "happy" || curr.mood === "calm" || curr.mood === "energetic") {
                predictionClass = 0;
            } else {
                predictionClass = 1;
            }
        } else {
            if (curr.mood  === "happy" || curr.mood === "calm" || curr.mood === "energetic") {
                predictionClass = 2;
            } else {
                predictionClass = 3;
            }
        }

        const rtt = tf.tensor(Object.values(curr));
        classifier.addExample(rtt, predictionClass);
    }

    const rttNew = tf.tensor(Object.values(records[records.length - 1]));

    const predictedClass = await classifier.predictClass(rttNew, 3);
    return predictedClass;
}