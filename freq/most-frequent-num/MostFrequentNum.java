import java.util.*;
import java.io.*;

public class MostFrequentNum {
    public int mostFrequentElementFinderWithoutSorting(int[] arr) {
        // İçerisinde fonksiyona parametre olarak gönderilmiş olan array'in
        // içerisindeki elemanların kaç kez tekrar ettiğini tutan
        // array'i initialize ediyorum.
        int[] freqs = new int[1000000];

        // Fonksiyona parametre olarak gönderilmiş olan array'in elemanlarının
        // tekrar etme sayılarını freqs array'ine atıyorum.
        for (int i = 0; i < arr.length; i++) {
            freqs[arr[i]]++;
        }

        // Java içerisinde bulunan built-in bulunan PriorityQueue yardımıyla maxHeap
        // oluşturuyorum.
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[1] - a[1]);

        // Freqs array'inde 0'dan daha fazla tekrar etmiş elemanları maxHeap'imize
        // atıyorum.
        for (int i = 0; i < freqs.length; i++) {
            if (freqs[i] > 0)
                maxHeap.offer(new int[] { i, freqs[i] });
        }

        // MaxHeap'te bulunan poll metodu ile en çok tekrar eden elemanı buluyoruz ve
        // geri
        // döndürüyorum.
        return maxHeap.poll()[0];
    }

    public int mostFrequentElementFinderWithSorting(int[] arr) {
        // Fonksiyona parametre olarak gönderilmiş array'i java'da built-in olarak
        // bulunan sort fonksiyonu yardımıyla sıralıyorum.
        Arrays.sort(arr);

        // Elemanların kaç kez geçtiğini tutan freqs array'ini initialize ediyorum.
        int[] freqs = new int[1000000];

        // Freqs array'ine dizideki elemanların kaç kez tekrar ettiğini atıyorum.
        for (int i = 0; i < arr.length; i++) {
            freqs[arr[i]]++;
        }

        // MaxHeap oluşturuyorum.
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[1] - a[1]);

        // Freqs array'inde en az bir kez tekrar etmiş elemanları maxHeap.offer metodu
        // yardımıyla heap'ime atıyorum.
        for (int i = 0; i < freqs.length; i++) {
            if (freqs[i] > 0)
                maxHeap.offer(new int[] { i, freqs[i] });
        }

        // heap'in en yukarısındaki dolayısıyla en çok tekrar etmiş elemanı
        // geriye döndürüyorum.
        return maxHeap.poll()[0];
    }

    public static void main(String args[]) {
        MostFrequentNum m = new MostFrequentNum();

        int[] arr = new int[100000];

        try {
            File myObj = new File("output.txt");
            Scanner myReader = new Scanner(myObj);
            int i = 0;
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                arr[i] = Integer.valueOf(data);
                i++;
            }

            long start = System.nanoTime();
            int val = m.mostFrequentElementFinderWithoutSorting(arr);
            long end = System.nanoTime();
            long elapsedTime = end - start;
            System.out.println("Without Sorting");
            System.out.println("Took " + elapsedTime + "ns to complete");
            System.out.println("Answer: " + val);

            start = System.nanoTime();
            int val2 = m.mostFrequentElementFinderWithSorting(arr);
            end = System.nanoTime();
            elapsedTime = end - start;
            System.out.println("With Sorting");
            System.out.println("Took " + elapsedTime + "ns to complete");
            System.out.println("Answer: " + val2);

            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }

    }
}