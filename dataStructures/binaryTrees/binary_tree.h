#ifndef BINARY_TREE_H
#define BINARY_TREE_H

#include <stdio.h>
#include <stdlib.h>

/**
 * struct node - struct holding data for each node in tree
 * @value: value of node
 * @left: pointer to node to left
 * @right: pointer to node to right
 */
typedef struct node
{
	int value;
	struct node *left;
	struct node *right;
} node;

/**
 * create_node - Create node with data given and no links to children
 * @data: Value of data to be held in node
 * Return: pointer to node created
 */
node *create_node(int data)
{
	node *new_node = NULL;

	new_node = (node *)malloc(sizeof(node));
	if (new_node)
	{
		new_node->value = data;
		new_node->left = NULL;
		new_node->right = NULL;
	}

	return (new_node);
}

/**
 * free_tree - recursively free binary tree
 * @node: pointer to node to be freed
 */
void free_tree(node *node)
{
	if (node)
	{
		free_tree(node->left);
		free_tree(node->right);
		free(node);
	}
}

/**
 * print_preorder - print value at root then every level in order L to R
 * @root: pointer to root of tree
 */
void print_preorder(node *root)
{
	if (root == NULL)
		return;

	printf("%d ", root->value);
	print_preorder(root->left);
	print_preorder(root->right);
}

#endif
