#include "binary_tree.h"

/**
 * storeInorder - stores inorder traversal of binary tree
 * @node: pointer to binary tree node
 * @arr: array to add values of nodes to
 * @index_ptr: pointer to index that corresponds to node (so can change)
 */
void storeInorder(node *node, int arr[], int *index_ptr)
{
	/* Base Case */
	if (node == NULL)
		return;

	/* Store the left subtree */
	storeInorder(node->left, arr, index_ptr);

	/* Copy the root's data */
	arr[*index_ptr] = node->value;
	/* increase index for next entry */
	(*index_ptr)++;

	/* Store the right subtree */
	storeInorder(node->right, arr, index_ptr);
}

/**
 * countNodes - count how many nodes are in binary tree
 * @root: pointer to root of tree
 * Return: total number of nodes
 */
int countNodes(node *root)
{
	if (root == NULL)
		return (0);

	/* Counts number of nodes on left and right */
	return (countNodes(root->left) + countNodes(root->right) + 1);
}

/**
 * arrayToBST - copies contents of array to binary tree
 * @arr: array to copy
 * @node: pointer to binary tree node
 * @index_ptr: index of array that corresponds to node
 */
void arrayToBST(int *arr, node *node, int *index_ptr)
{
	/* Base Case */
	if (node == NULL)
		return;

	/* basically does Inorder traversal of tree to copy arr elements to nodes */
	/* first update the left subtree */
	arrayToBST(arr, node->left, index_ptr);

	/* Now update root's data and increment index */
	node->value = arr[*index_ptr];
	(*index_ptr)++;

	/* finally update the right subtree */
	arrayToBST(arr, node->right, index_ptr);
}

/**
 * binaryTreeToBST - converts any unsorted binary tree to balanced
 * @root: pointer to root of binary tree
 */
void binaryTreeToBST(node *root)
{
	int n, elem;
	int a, b, c;
	/* Tree is empty */
	if (root == NULL)
		return;

	/* Count number of nodes in tree to find size of array */
	n = countNodes(root);

	/* Create temp array the size of binary tree */
	int arr[n];

	/* elem is index of element in tree corresponding with node */
	/* Needs to be changeable so pass pointer - 0 will hold value at root */
	elem = 0;
	storeInorder(root, arr, &elem);

	/* Simple array sort - selection sort */
	for (a = 0; a < n; a++)
	{
		for (b = a + 1; b < n; b++)
		{
			if (arr[a] > arr[b])
			{
				c = arr[a];
				arr[a] = arr[b];
				arr[b] = c;
			}
		}
	}

	/* Copy array elements back to Binary Tree */
	/* 0 corresponds to root, but needs to be changed for other nodes */
	elem = 0;
	arrayToBST(arr, root, &elem);
}

/**
 * main - constructs unsorted binary tree, converts to balanced, and prints
 * Return: 0 if successful
 */
int main(void)
{
	node *root = NULL;

	/*
	* Constructing this tree
	*		10
	*	30		15
	* 20			5
	*/
	root = create_node(10);
	root->left = create_node(30);
	root->right = create_node(15);
	root->left->left = create_node(20);
	root->right->right = create_node(5);

	/* Print inorder traversal of tree */
	print_inorder(root);
	printf("\n");

	/*
	* Connverting to this tree
	*		15
	*	10		20
	* 5				30
	*/
	binaryTreeToBST(root);

	/* Print inorder traversal of tree */
	print_inorder(root);
	printf("\n");

	free_tree(root);

	return (0);
}
