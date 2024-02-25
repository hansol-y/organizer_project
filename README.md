# Mind Vector Project

## What is this app?
- This app helps you record the vector of your low mood, what you've tried to get out of this mood, and how effectively it changed the vector of your mood. It can suggest you what you should do to get out of the low feelings, and also let you track how your mood have been changed.

## User Stories
- **As a user, I want to record my mood whenever it goes down so that I can visualize my current mood**
    - **DoD**
    1. The users access the app, and they can see the coordinate showing their mood in the day
    2. The users click '+' button, and they can see the mood-recording page (current mood, its gratitude)
    3. The users save the mood they recorded, and they can see a vector (arrow) shown in the coordinate
    4. The users click the vector, and they can record what they've done for getover and how effective it was. If there were any changes, the coordinate is updated
- As a user, I want to record my efforts or reactions on the low moods so that I can check which actions were effective
- As a user, I want to track my mood changes in the day so that I can see how today is going
- As a user, I want to see the history of the mood change for the period they selected so that I can check my long-term mental state
- As a user, I want to get notifications if my mood goes in to the warning-zone, or my mood goes down too much in a recent period

## Mood Schema
- moodType: Type of the mood (colour of the vector)
- strength: How strong the feeling is (length of the vector)
- personal: Is the mood based on personal events or more of social/public/interpersonal events? (x coord)
- activeness: Does this mood trigger visible actions/behaviours? (y coord)
- date: the day felt this mood (mostly be today) -> default: today