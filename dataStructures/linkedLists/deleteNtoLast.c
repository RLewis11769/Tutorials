#include "linkedList.h"

/**
 * delete_n_to_last - deletes nth node from end of linked list
 * @head: pointer to head of list
 * @n: number of nodes from end of list to delete
 * Return: pointer to head of list with node deleted
 */
listint_t *delete_n_to_last(listint_t **head, unsigned int n)
{
	unsigned int x;

	/* Note that these are just pointers to nodes, not new nodes */
	listint_t *runner = *head;
	listint_t *walker = *head;

	/* Advance runner so points at node n + 1 ahead */
	for (x = 1; x <= n + 1; x++)
		runner = runner->next;

	/* When runner is NULL, walker will point at node before node to delete */
	while (runner)
	{
		runner = runner->next;
		walker = walker->next;
	}

	/* Point runner at node to delete to keep track for freeing purposes */
	runner = walker->next;

	/* Set next of current node to node after node to delete */
	walker->next = walker->next->next;

	/* Free value that was deleted - temporarily being pointed at by runner */
	free(runner);

	return (*head);
}

/**
 * main - Creates linked list and calls delete_at_n_to_last function
 * Return: 0 if successful
 */
int main(void)
{
	listint_t *list = NULL;
	int array[] = {19, 8, 3, 14, 6, 12, 9, 5, 100, 7};
	size_t n;

	/* Calculate size of array - in this case 10 */
	n = sizeof(array) / sizeof(array[0]);

	/* Creates linked list from array */
	list = create_list_from_array(array, n);
	/* If can't create/allocate, fails */
	if (!list)
		return (1);

	/* Prints existing list */
	print_list(list);
	printf("\n");

	/* Deletes node at nth to last - in this case 9th index */
	delete_n_to_last(&list, 4);

	/* Print list with deleted node */
	print_list(list);
	printf("\n");

	/* Frees memory */
	free_list(list);

	return (0);
}
