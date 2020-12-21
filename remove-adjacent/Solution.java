import java.util.*;
import java.lang.*;

public class Solution {
    public String removeDuplicates(String s) {
        Stack<Character> stack = new Stack();
        StringBuilder sb = new StringBuilder();
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (stack.isEmpty()) {
                sb.append(c);
                count++;
            } else if (c != stack.peek()) {
                stack.push(c);
                sb.append(c);
                count++;
            } else if (c == stack.peek()) {
                stack.pop();
                sb = sb.delete(count-1,count+1);
                count-=2;
            }
        }
        
        return sb.toString();
    }

	public static void main() {
		System.out.println(removeDuplicates("abbaca"));
	}
}