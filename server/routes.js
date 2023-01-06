const { Category, Problem } = require("./models");
const { arrayToLinkedList, linkedListToArray } = require("./helpers")

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

app.get("/problem/:name", async (req, res) => {
    
    try {
        const problem = await Problem.find(req.params);
        res.send(problem);
    } catch (error) {
        res.status(500).send(error);
    }
})

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
        res.send(JSON.stringify(answer));
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/longest_palindromic_substring", async (req, res) => {
    var longestPalindrome = function(s) {
        if (s.length === 1) return s[0];
        let left, right;
        let longest = s[0];
        for (let i = 0.5; i < s.length; i += 0.5) {
            if (Number.isInteger(i)) {
                left = i - 1;
                right = i + 1;
            } else {
                left = i - 0.5;
                right = i + 0.5;
            }
            while (s[left] === s[right] && left >= 0 && right < s.length) {
                if (longest.length < (right - left + 1)) longest = s.slice(left, right + 1);
                left--;
                right++;
            }
        }
        return longest;
    };

    try {
        const answer = longestPalindrome(req.body.String);
        res.send(JSON.stringify(answer));
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/minimum_window_substring", (req, res) => {
    var minWindow = function(s, t) {
        if (t.length > s.length) return "";
        if (t.length === 1) {
            return s.indexOf(t) !== -1 ? t : "";
        }
        
        let tMap = new Array(123).fill(0);
        let sMap = new Array(123).fill(0);
        
        for (const i in t) tMap[t.charCodeAt(i)]++;
        
        let indexes, min = Infinity, left = 0, right = 1;
        sMap[s.charCodeAt(left)]++;
        while (right < s.length) {
            sMap[s.charCodeAt(right)]++;
            while (tMap.every((char, idx) => char <= sMap[idx])) {
                if (right - left + 1 < min) {
                    min = right - left + 1;
                    indexes = [left, right];
                }
                sMap[s.charCodeAt(left)]--;
                left++;
            }
            right++;
        }
        return indexes ? s.slice(indexes[0],indexes[1]+1) : "";
    };

    try {
        const answer = minWindow(req.body.String1, req.body.String2);
        res.send(JSON.stringify(answer));
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/reverse_linked_list", (req, res) => {
    var reverseList = function(head) {
        if (!head) return head;
        let node = head;
        let prev = null;
        let next;
        while (node) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return prev;
    };

    try {
        //TODO: test functionality
        const linkedList = arrayToLinkedList(req.body.Array);
        const answer = reverseList(linkedList);
        const arr = linkedListToArray(answer);
        res.send(JSON.stringify(arr));
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/remove_nth_node_from_end_of_list", (req, res) => {
    var removeNthFromEnd = function(head, n) {
        let count = 0, node = head;
        while (node) {
            count++;
            node = node.next;
        }
        let fromStart = count - n;
        if (fromStart === 0) return head.next;
        node = head;
        while (true) {
            if (--fromStart === 0) {
                if (!node.next.next) node.next = null;
                else node.next = node.next.next;
                return head;
            }
            node = node.next;
        }
    };

    try {
        const linkedList = arrayToLinkedList(req.body.Array);
        const answer = removeNthFromEnd(linkedList, req.body.Number);
        const arr = linkedListToArray(answer);
        res.send(JSON.stringify(arr));
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = app;