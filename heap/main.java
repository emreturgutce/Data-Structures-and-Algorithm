import java.util.*;

class MaxHeap {
	public static void main(String args[]) {
		PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> a - b);
		maxHeap.add(5);
		maxHeap.add(8);
		maxHeap.add(30);
		maxHeap.add(15);
		System.out.println(maxHeap.poll());
	}
}