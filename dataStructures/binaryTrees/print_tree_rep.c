#include "binary_tree.h"
#define COUNT 10

/**
 * print_tree_rec - actually prints tree
 * @node: node to print
 * @space: number of spaces (in COUNT) to indicate level
 */
void print_tree_rec(node *node, int space)
{
	if (node == NULL)
		return;

	/* Increase distance between levels - COUNT defined as macro */
	space += COUNT;

	/* Process right child first */
	print_tree_rec(node->right, space);

	/* Newline separates nodes - tree will print sideways */
	printf("\n");
	/* Spaces indicate level */
	for (int x = COUNT; x < space; x++)
		printf(" ");

	/* Print value of node */
	printf("%d\n", node->value);

	/* Process left child */
	print_tree_rec(node->left, space);
}

/**
 * print_tree - wrapper over actual printing function
 * @root: pointer to starter node
 */
void print_tree(node *root)
{
	/* Pass initial space count as 0 */
	print_tree_rec(root, 0);
}

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
 * main - inserts data into tree and prints it
 * Return: 0 if successful
 */
int main(void)
{
	node *root = NULL;

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

	print_tree(root);
	free_tree(root);

	return (0);
}
