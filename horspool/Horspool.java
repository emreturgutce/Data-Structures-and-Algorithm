class HorsPool {
    static int NO_OF_CHARS = 256;

    static int max(int a, int b) {
        return (a > b) ? a : b;
    }

    static void badCharHeuristic(char[] str, int size, int badchar[]) {
        int i;

        for (i = 0; i < NO_OF_CHARS; i++)
            badchar[i] = -1;

        for (i = 0; i < size; i++)
            badchar[(int) str[i]] = i;
    }

    static void search(char txt[], char pat[]) {
        int m = pat.length;
        int n = txt.length;

        int badchar[] = new int[NO_OF_CHARS];

        badCharHeuristic(pat, m, badchar);

        int s = 0;

        while (s <= (n - m)) {
            int j = m - 1;

            while (j >= 0 && pat[j] == txt[s + j])
                j--;

            if (j < 0) {
                System.out.println("Patterns occur at shift = " + s);
                s += (s + m < n) ? m - badchar[txt[s + m]] : 1;

            }

            else
                s += max(1, j - badchar[txt[s + j]]);
        }
    }

    public static void main(String[] args) {
        char txt[] = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                .toCharArray();
        char pat[] = "printing".toCharArray();
        search(txt, pat);
    }
}