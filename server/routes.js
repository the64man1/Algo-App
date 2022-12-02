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

app.post("/best_time_to_buy_and_sell_stock", (req, res) => {
    var maxProfit = (prices) => {
        let max = 0;
        let left = 0;
        let right = 1;
        while (right < prices.length) {
            if (prices[right] < prices[left]) {
                left = right;
            } else {
                max = Math.max(max, prices[right] - prices[left]);
            }
            right++;
        }
        return max;
    };

    try {
        const input = JSON.parse(req.body)
        const answer = maxProfit(input.Array);
        res.send(answer);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/maximum_subarray", (req, res) => {
    var maxSubArray = (nums) => {
        let maxSum = nums[0];
        let tempSum = maxSum;
        for (let i = 1; i < nums.length; i++) {
            tempSum = Math.max(tempSum + nums[i], nums[i]);
            maxSum = Math.max(tempSum, maxSum);
        }
        return maxSum;
    };

    try {
        const answer = maxSubArray(req.body.Array);
        res.send(answer);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/container_with_most_water", (req, res) => {
    var maxArea = (height) => {
        let left = 0;
        let right = height.length - 1;
        let smaller, temp;
        let max = 0;
        
        while (left < right) {
            smaller = Math.min(height[left], height[right]);
            temp = smaller * (right - left);
            max = Math.max(max, temp);
            if (height[left] < height[right]) left++;
            else right--;
        }
        
        return max;
    };

    try {
        const answer = maxArea(req.body.Array);
        res.send(answer);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/product_of_array_except_self", (req, res) => {
    var productExceptSelf = (nums) => {
        let product = nums.reduce((a,b) => a * b);
        let answer = [];
        let temp;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] === 0) {
                temp = nums.slice(0, i).concat(nums.slice(i+1));
                answer.push(temp.reduce((a,b) => a * b));
            } else {
                answer.push(product * Math.pow(nums[i], -1));
            }
        }
        return answer;
    };

    try {
        const answer = productExceptSelf(req.body.Array);
        res.send(answer);
    } catch (error) {
        res.status(500).send(error);
    }
})

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