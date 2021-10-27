#ifndef LINKED_LIST_H
#define LINKED_LIST_H

#include <stdio.h>
#include <stdlib.h>
#include <stddef.h>

/**
 * struct listint_s - linked list node
 * @n: value stored in node
 * @next: pointer to next element of list
 */
typedef struct listint_s
{
	int n;
	struct listint_s *next;
} listint_t;

/**
 * newNode - creates new node unconnected to list
 * @data: data to be stored in node
 * Return: pointer to new node
 */
listint_t *newNode(int data)
{
	listint_t *new = NULL;

	/* Create new node */
	new = malloc(sizeof(listint_t));
	if (new == NULL)
		return (NULL);

	/* Assign data to new node */
	new->n = data;
	new->next = NULL;

	return (new);
}

/**
 * create_list_from_array - creates linked list from array of integers
 * @array: array to convert to linked list
 * @size: size of array
 * Return: pointer to the first element of linked list
 */
listint_t *create_list_from_array(int *array, size_t size)
{
	listint_t *list, *node;
	int *tmp;

	list = NULL;

	while (size--)
	{
		/* Allocates memory for new node */
		node = malloc(sizeof(*node));
		if (!node)
			return (NULL);

		tmp = (int *)&node->n;
		*tmp = array[size];
		node->next = list;
		list = node;
	}
	return (list);
}

/**
 * add_node_to_list - adds new node at beginning of a listint_t list
 * @head: pointer to a pointer to start of list
 * @n: data to be stored in node
 * Return: pointer to new node
 */
listint_t *add_node_to_list(listint_t **head, int n)
{
	listint_t *new;

	new = malloc(sizeof(listint_t));
	if (new == NULL)
		return (NULL);

	new->n = n;
	new->next = *head;
	*head = new;

	return (new);
}

/**
 * print_list - prints linked list
 * @list: linked list to be printed
 */
void print_list(listint_t *list)
{
	int x = 0;

	/* While list is not at end */
	while (list)
	{
		/* Prints comma starting after first node */
		if (x > 0)
			printf(", ");
		/* Prints value of each node */
		printf("%d", list->n);
		/* Updates x so prints comma after value of first node */
		x = 1;
		/* Advances to next node - loop ends when on last node and next is null */
		list = list->next;
	}
}

/**
 * free_list - frees linked list
 * @head: pointer to list to be freed
 */
void free_list(listint_t *head)
{
	listint_t *current;

	while (head != NULL)
	{
		current = head;
		head = head->next;
		free(current);
	}
}

#endif
