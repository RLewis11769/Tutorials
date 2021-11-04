#include "binary_tree.h"

/**
 * insert_data - insert data into node and children (NOT balanced)
 * @root: pointer to address of node
 * @data: data to be added into tree (not necessarily root)
 */
void insert_data(node **root, int data)
{
	/* if node doesn't exist, create it */
	if (*root == NULL)
	{
		*root = create_node(data);
		return;
	}

	/* Inserts data into left and right nodes depending if larger or smaller */
	/* Starts from root and adds at first available spot */
	/* Duplicates all stored on left side of tree */
	if (data <= (*root)->value)
		insert_data(&(*root)->left, data);
	else
		insert_data(&(*root)->right, data);
}

/**
 * x_largest_rec - recursive function that finds node with x largest value
 * @root: pointer to node
 * @count: total count of nodes processed so far
 * @x: x largest node value to be found
 * Return: node with x largest value
 */
node *x_largest_rec(node *root, int *count, int x)
{
	/* Logic is traverse through right subtree then left */
	/* This essentially does a reverse inorder traversal */

	node *found;

	/* Base case */
	if (root == NULL)
		return (NULL);

	/* Traverse right subtree first */
	found = x_largest_rec(root->right, count, x);

	/* If found, pass back through tree */
	if (found)
		return (found);

	/* Change value at address of count  */
	*count += 1;
	/* if count is x largest, return node */
	/* This is actual return of node - happens once */
	if (*count == x)
		return (root);

	/* Now traverse left subtree (after right) to reverse inorder */
	return (x_largest_rec(root->left, count, x));
}

/**
 * find_x_largest - wrapper function to find x largest node value
 * @root: pointer to root node
 * @x: count of value from end to find
 * Return: node with x largest value
 */
node *find_x_largest(node *root, int x)
{
	/* Count the total number of nodes processed so far */
	int count = 0;

	/* x_largest_rec will actually return the correct node, so pass it along */
	return (x_largest_rec(root, &count, x));
}

/**
 * main - inserts data into tree, prints, and finds x largest value in tree
 * Return: 0 if successful
 */
int main(void)
{
	int x = 3;
	node *root = NULL;
	node *x_largest = NULL;

	insert_data(&root, 10);
	insert_data(&root, 3);
	insert_data(&root, 1);
	insert_data(&root, 4);
	insert_data(&root, 7);
	insert_data(&root, 12);
	insert_data(&root, 15);
	insert_data(&root, 7);
	insert_data(&root, 14);
	insert_data(&root, 8);

	/* Print tree in order so can visually count which node is x largest */
	print_inorder(root);
	printf("\n");

	x_largest = find_x_largest(root, x);

	/* If can find x largest value, print it */
	if (x_largest)
		printf("%d largest: %d \n", x, x_largest->value);
	else
		printf("Not found\n");

	return (0);
}
