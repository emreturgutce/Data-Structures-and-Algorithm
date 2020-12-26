import java.io.*;
import java.util.*;

public class NearestPair {
    public int[] nearestEls(int[] arr) {
        int minDistance = Integer.MAX_VALUE;
        int[] vals = new int[2];

        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                // Hangi elemanın büyük olduğuna karar ver büyük olanı küçükten çıkar
                // eğer çıkan sonuç daha önceki en yakın çiftten de küçük ise
                // minDistance'ın yeni değerine farklarını ata. Eğer sayıları eşit oldukları
                // yani aralarındaki fark 0 olduğu bir durum değerleri döndür.
                if (arr[i] > arr[j] && arr[i] - arr[j] < minDistance) {
                    minDistance = arr[i] - arr[j];
                    vals[0] = arr[i];
                    vals[1] = arr[j];
                } else if (arr[j] > arr[i] && arr[j] - arr[i] < minDistance) {
                    minDistance = arr[j] - arr[i];
                    vals[0] = arr[i];
                    vals[1] = arr[j];
                } else if (arr[i] == arr[j]) {
                    return new int[] { arr[i], arr[j] };
                }
            }
        }

        return vals;
    }

    public int[] nearestElsWithSorting(int[] arr) {
        Arrays.sort(arr);

        int val = Integer.MAX_VALUE;
        int[] vals = new int[2];

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] - arr[i + 1] < val) {
                val = arr[i] - arr[i + 1];
                vals[0] = arr[i];
                vals[1] = arr[i + 1];
            } else if (arr[i] - arr[i + 1] == 0) {
                val = arr[i] - arr[i + 1];
                return new int[] { arr[i], arr[i + 1] };
            }
        }

        return vals;
    }

    public static void main(String args[]) {
        NearestPair n = new NearestPair();

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
            int[] val = n.nearestEls(arr);
            long end = System.nanoTime();
            long elapsedTime = end - start;
            System.out.println("Without Sorting");
            System.out.println("Took " + elapsedTime + "ns to complete");
            System.out.println("Answer " + val[0] + ", " + val[1]);

            start = System.nanoTime();
            val = n.nearestElsWithSorting(arr);
            end = System.nanoTime();
            elapsedTime = end - start;
            System.out.println("With Sorting");
            System.out.println("Took " + elapsedTime + "ns to complete");
            System.out.println("Answer " + val[0] + ", " + val[1]);

            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }
}
