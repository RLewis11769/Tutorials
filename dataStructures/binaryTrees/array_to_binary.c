#include "binary_tree.h"

/**
 * sortedArrayToBST - creates balanced search tree from sorted array
 * @arr: array to sort
 * @start: index to start adding to tree
 * @end: index to end adding to tree
 * Return: pointer to balanced search tree
 */
node *sortedArrayToBST(int arr[], int start, int end)
{
	int mid;
	node *temp;

	/* Important that array is sorted */
	if (start > end)
		return (NULL);

	/* Find middle element and make it root */
	mid = (start + end) / 2;
	temp = create_node(arr[mid]);
	if (temp == NULL)
		return (NULL);

	/* Recursively construct left subtree as left child of root */
	/* Pass array, and index of start (orig 0) to just before mid */
	temp->left = sortedArrayToBST(arr, start, mid - 1);

	/* Recursively construct right subtree as right child of root */
	/* Pass array, and index of just after mid to last index */
	temp->right = sortedArrayToBST(arr, mid + 1, end);

	return (temp);
}

/**
 * main - create array, convert it to tree, and print
 * Return: 0 if successful
 */
int main(void)
{
	int n;
	node *root;
	/* Note: This array needs to be sorted */
	int arr[] = {1, 2, 3, 4, 5, 6, 7};

	/* Calculate size of array */
	n = sizeof(arr) / sizeof(arr[0]);

	/* Convert array to binary_tree */
	root = sortedArrayToBST(arr, 0, n - 1);

	print_preorder(root);
	printf("\n");

	free_tree(root);

	return (0);
}
