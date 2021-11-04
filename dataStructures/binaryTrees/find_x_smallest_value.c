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
 * find_x_smallest - find node with x smallest value
 * @root: pointer to node
 * @x: count (not index) of smallest value to find
 * Return: node with x smallest value
 */
node *find_x_smallest(node *root, int x)
{
	/* Logic is traverse through left subtree then right */
	/* This essentially does an inorder traversal */

	node *found;

	/* Base case */
	if (root == NULL)
		return (NULL);

	/* Traverse left subtree first */
	found = find_x_smallest(root->left, x);

	/* If found, pass back through tree */
	if (found)
		return (found);

	/* Subtract one from x to indicate count of nodes that have been processed */
	x--;
	/* Because based on actual count, not index, x = 1 when at end of list */
	/* This is actual return of node - happens once */
	if (x == 1)
		return (root);

	/* Now traverse right subtree to do inorder traverse */
	return (find_x_smallest(root->right, x));
}

/**
 * main - inserts data into tree, prints, and finds x smallest value in tree
 * Return: 0 if successful
 */
int main(void)
{
	int x = 3;
	node *root = NULL;
	node *x_smallest = NULL;

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

	/* Print tree in order so can visually count which node is x smallest */
	print_inorder(root);
	printf("\n");

	x_smallest = find_x_smallest(root, x);

	/* If can find x smallest value, print it */
	if (x_smallest)
		printf("%d smallest: %d \n", x, x_smallest->value);
	else
		printf("Not found\n");

	return (0);
}
