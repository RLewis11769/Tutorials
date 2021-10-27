#include "linkedList.h"

/**
 * swap_nodes_in_pairs - swap every two adjacent nodes
 * @head: pointer to head of list
 * Return: pointer to head of list
 */
listint_t *swap_nodes_in_pairs(listint_t **head)
{
	listint_t *prev, *left, *right;

	prev = *head;
	/* Prev->next should ideally be *head... Not working */

	/* while current and after have values and there is pair */
	while (prev->next != NULL && prev->next->next != NULL)
	{
		/* Set up nodes to be swapped */
		left = prev->next;
		right = prev->next->next;

		left->next = right->next;
		right->next = left;
		prev->next = right;

		/* Move ahead two spaces */
		prev = prev->next->next;
	}
	return (*head);
}

/**
 * main - Creates linked list and calls delete_at_n_to_last function
 * Return: 0 if successful
 */
int main(void)
{
	listint_t *list;
	int array[] = {1, 2, 3, 4, 5};
	size_t n;

	/* Divide size of array by size of one element to find size of data */
	/* In this case, each element is an int */
	n = sizeof(array) / sizeof(array[0]);

	/* Creates linked list where each element is n-sized from array */
	list = create_list_from_array(array, n);

	/* If can't create/allocate, fails */
	if (!list)
		return (1);

	/* Prints existing list */
	print_list(list);
	printf("\n");

	/* Calls function to swap each node in pair */
	swap_nodes_in_pairs(&list);

	/* Print list with deleted node */
	print_list(list);
	printf("\n");

	free_list(list);

	return (0);
}
