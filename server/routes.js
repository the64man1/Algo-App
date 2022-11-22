const { Category, Problem } = require("./models");

const express = require("express");
const app = express();

app.post("/add_category", async (req, res) => {
    const category = new Category(req.body);

    try {
        await category.save();
        res.send(category);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/add_problem/:category", async (req, res) => {
    const problem = new Problem(req.body);
    
    try {
        await problem.save();
        await Category.updateOne(req.params, { $push: { problems: problem.name }});
        res.send(problem);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find({});
        res.send(categories);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/valid_palindrome", async (req, res) => {
    const isPalindrome = (s) => {
        s = s.toLowerCase().split('').filter(char => ((char.charCodeAt() > 96) && (char.charCodeAt() < 123)) ||
        ((char.charCodeAt() > 47) && (char.charCodeAt() < 58)));

        let left = 0;
        let right = s.length - 1;

        while (left < right) {
        if (s[left] !== s[right]) return false;
            left++;
            right--;
        }

        return true;        
    }
    
    try {
        const answer = isPalindrome(req.body.String);
        res.send(answer);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/longest_substring_without_repeating_characters", async (req, res) => {
    const longestSubstring = (s) => {
        if (s.length <= 1) return s.length;
        if (s.length === 2) return s[0] === s[1] ? 1 : 2;
        let left = 0;
        let right = 1;
        while (s[left] === s[right]) {
            if (right === s.length - 1) return s[left] === s[right] ? 1 : 2;
            left++;
            right++;
        }
        let longest = 2;
        const set = new Set();
        set.add(s[left]);
        while (right < s.length) {
            if (s[right] === s[right-1]) {
                set.clear();
                left = right;
            }
            while (set.has(s[right])) {
                set.delete(s[left]);
                left++;
            }
            set.add(s[right]);
            longest = Math.max(longest, right - left + 1);
            right++;
        }
        return longest;        
    }

    try {
        const answer = longestSubstring(req.body.String);
        res.send(answer);
    } catch (error) {
        res.status(500).send(error);
    }
}); 

app.get("/problem/:name", async (req, res) => {
    
    try {
        const problem = await Problem.find(req.params);
        res.send(problem);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = app;