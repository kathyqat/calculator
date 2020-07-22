# calculator

This project is for building a functional on-screen calculator. From The Odin Project's (TOP) [Full Stack Development](https://www.theodinproject.com/courses/web-development-101/lessons/calculator) course.

Codepen link: https://codepen.io/kathyqat/pen/bGEwqBK

I forgot what a calculator looked like, so mine is based off the Google calculator. Thanks Google! 

Attempts and Observations:
1. I attempted to use the reduce() array method, but it is too much effort to figure out how to store and recall an operator. It is way easier to use a for loop and have simple access by the way of array indices.
2. When adding a decimal button for the extra credit section, I tried two things before the final solution. First, I thought that I would have to use removeEventListener() method on the button. That relies on the removing the function that was first added, but because the removal also nests in the function, the logic became too complicated to unravel. Second, I thought I could turn the querySelector nodelist into an array and then filter() out the decimal button. That also did not quite work out.
3. Can't select by id when the id is ".". I tried variations but it just didn't work.
4. JavaScript has a bug when multiplying decimals. For example: 2.2 * 3 = 6.6000000000000005. I mistakenly thought my code was wrong and I was trying to find the wrong spot, until I directly console.log() the above formula. 
5. a) I had a continuing misbehaviour while testing the equals button against the TOP's criteria. My logic was sound and I couldn't puzzle it out; console.log() everywhere was showing as expected. Then when I asked someone over to have a look, the behaviour magically could not be replicated -__- I'm not sure of what to think of bugs that come from JS itself and not my code. How am I supposed to know? "Just debug it" -Korean advice
UPDATE: My logic was not sound and I was a fool. But I still don't know why it did work when it shouldn't have.
5. b) In my function evaluateEquals(), display.textContent would not properly update on-screen when using the keyboard. It actually updates in console/developer side perfectly and as expected, but on-screen, the result would briefly flash then disappear. It is so confusing. And it only sometimes happens. And only when pressing "enter" on the keyboard. Whyy
6. Pressing the division sign "/" will bring up the "search" shortcut in Firefox. So if you're using both of those, please keep that in mind and exit search to continue using the calculator.
7. Sometimes you call someone over to look at your code, and then you immediately realize what was wrong with it when they arrive ¯\\_(ツ)_/¯
8. I like the look of the Google calculator so much that my display shows the entire equation as inputted, as opposed to merely showing the current number input. The latter is the expected behaviour of the project, but I went a little beyond. You may heap praise upon me :^)